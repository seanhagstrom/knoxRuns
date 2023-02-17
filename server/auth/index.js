const router = require('express').Router();
const axios = require('axios');
const BASE_URL = `http://localhost:5173`;
const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_CLIENT_SECRET } = process.env;
const { getUserById, createUser, updateUser } = require('../db');
const { generateRandomPassword } = require('../util/generateRandomPassword');
const { authenticateUser } = require('../util/authenticateUser');
const { sendEmail } = require('../util/sendEmail');

// GET auth/me
router.get('/me', async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// GET auth/exchange_token
router.get('/exchange_token/:id', async (req, res, next) => {
  // console.log(req.params);
  const {
    query: { code },
    params: { id },
  } = req;
  try {
    const { data } = await axios.post(
      `https://www.strava.com/oauth/token`,
      {
        client_id: VITE_STRAVA_CLIENT_ID,
        client_secret: VITE_STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('authdata: ', data);

    const user = await getUserById({ id });
    console.log(user);

    if (user && !user.strava_id) {
      const {
        refresh_token,
        access_token,
        athlete: {
          id: strava_id,
          username,
          firstname,
          lastname,
          city,
          state,
          sex,
          weight,
          profile_medium: profile_image,
          bio,
        },
      } = data;

      const fields = {
        refresh_token,
        access_token,
        strava_id,
        username,
        firstname,
        lastname,
        city,
        state,
        sex,
        weight,
        profile_image,
        bio,
      };

      await updateUser(id, fields);
      res.redirect(`${BASE_URL}/me`);
    } else if (user && user.strava_id) {
      res.redirect(`${BASE_URL}/me`);
    } else {
      res.redirect(`${BASE_URL}/register`);
    }
  } catch (error) {
    next(error);
  }
});

// POST auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('{ email, password } in auth/index', { email, password });
    const result = await authenticateUser({ email, password });
    console.log('result in auth/index', result);
    if (result.token) {
      res.status(200).send(result);
    } else {
      next(result);
    }
  } catch (error) {
    next(error);
  }
});

// POST auth/signup
router.post('/signup', async (req, res, next) => {
  console.log('in auth/signup');
  try {
    const { email, password } = req.body;

    const result = await createUser({ email, password });

    if (result.token) {
      await sendEmail({
        to: email,
        from: 'knoxrunsapp@gmail.com',
        subject: 'KnoxRuns Account Verification',
        text: `Thank you for signing up with KnoxRuns!
        `,
      });
      res.status(200).send(result);
    } else {
      next(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
