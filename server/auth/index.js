const router = require('express').Router();
const axios = require('axios');
const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_CLIENT_SECRET } = process.env;
const { authenticateUser } = require('../db');
const BASE_URL = `http://localhost:5173`;

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
    console.log(code);

    // const header = {
    //   headers: {
    //     Accept: 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json',
    //   },
    // };

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
    console.log(data);

    res.redirect(`${BASE_URL}`);
  } catch (error) {
    next(error);
  }
});

// POST auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await authenticateUser({ username, password });
    if (result.token) {
      console.log('this is my token!', result.token);
      res.status(200).send(result);
    } else {
      next(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
