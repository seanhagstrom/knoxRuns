const router = require('express').Router();
const { authenticateUser } = require('../db');

router.get('/', (req, res, next) => {
  try {
    res.status(200).send('You made it to the Auth route!');
  } catch (error) {
    console.error(error);
    throw error;
  }
});

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
