const router = require('express').Router();
const axios = require('axios');
const BASE_URL = `http://localhost:5173`;
const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_CLIENT_SECRET } = process.env;
const { authenticateUser, getUserByUsername, createUser } = require('../db');
const { generateRandomPassword } = require('../utils');

// GET auth
router.get('/', (req, res, next) => {
  try {
    res.status(200).send('You made it to the Auth route!');
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// GET auth/exchange_token
router.get('/exchange_token', async (req, res, next) => {
  const {
    query: { code },
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
    const {
      athlete: { username },
    } = data;

    const user = await getUserByUsername(username);

    if (!user) {
      const password = generateRandomPassword();

      const userToCreate = {
        username,
        password,
      };

      const userCreated = await createUser(userToCreate);

      res.redirect(`${BASE_URL}/register`);
    } else {
      res.redirect(`${BASE_URL}/me`);
    }
  } catch (error) {
    next(error);
  }
});

// POST auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authenticateUser({ email, password });
    if (result.token) {
      res.status(200).send(result);
    } else {
      next(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
