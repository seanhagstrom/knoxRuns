const router = require('express').Router();
const axios = require('axios');
const BASE_URL = `http://localhost:5173`;
const API_URL = `http://localhost:3000`;
const STRAVA_AUTH_URL = `https://www.strava.com/oauth/token`;
const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_CLIENT_SECRET } = process.env;
const { getUserById, createUser, updateUser, getUserByUUID } = require('../db');
const {
  authenticateUser,
  sendEmail,
  accessTokenExpired,
  getInititialStravaActivities,
} = require('../util');

// GET auth/me
router.get('/me', async (req, res, next) => {
  try {
    const { user } = req;
    const { expires_at, refresh_token } = user;
    const replaceToken = accessTokenExpired(expires_at);
    console.log(user);
    if (accessTokenExpired(expires_at)) {
      const { data } = await axios.post(
        STRAVA_AUTH_URL,
        {
          client_id: VITE_STRAVA_CLIENT_ID,
          client_secret: VITE_STRAVA_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token,
        },
        {
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('this is data from refresh token: ', data);
      const fields = {
        refresh_token: data.refresh_token,
        access_token: data.access_token,
        expires_at: data.expires_at,
      };
      const updatedUser = await updateUser(user.user_id, fields);
      res.status(200).send(updatedUser);
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET auth/exchange_token
router.get('/exchange_token/:id', async (req, res, next) => {
  // console.log(req.params);
  const {
    query: { code },
    params: { id },
    user: { user_id },
  } = req;
  try {
    const { data } = await axios.post(
      STRAVA_AUTH_URL,
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
        expires_at,
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
        expires_at,
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
      await getInititialStravaActivities({ access_token, user_id });
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

// PATCH auth/verify
router.patch('/verify', async (req, res, next) => {
  try {
    console.log('hit');
    const { body: verification_string } = req;

    const user = await getUserByUUID(verification_string);

    if (!user) {
      next({
        error: 'Error: Email Verification Failed',
        name: 'Email Verification Failed',
        message: 'Email Verification Failed. Please contact customer service.',
        status: 401,
      });
    } else {
      const updatedUser = await updateUser(user.user_id, {
        is_verified: true,
      });

      res.send(updatedUser).status(200);
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

    const result = await createUser({
      email,
      password,
    });

    if (result.token) {
      await sendEmail({
        to: email,
        from: 'knoxrunsapp@gmail.com',
        subject: 'KnoxRuns Account Verification',
        text: `
        Thank you for signing up with KnoxRuns! To verify your account and see your activites, please click here:
        ${BASE_URL}/next-steps/${result.verification_string}
        `,
      });
      console.log('auth/index/signup', result);
      delete result.verification_string;
      res.status(200).send(result);
    } else {
      next(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
