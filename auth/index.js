const router = require('express').Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).send('You made it to the Auth route!');
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = router;
