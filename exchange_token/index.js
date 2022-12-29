const router = require('express').Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).send("Well let's exchange a token!");
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = router;
