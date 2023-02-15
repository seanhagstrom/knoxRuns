const { getUserById } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const attachUserToRequest = async (req, res, next) => {
  try {
    const auth = req.header('Authorization');

    if (!auth) {
      next();
    } else {
      const [, token] = auth.split(' ');
      const { id } = jwt.verify(token, JWT_SECRET);

      const user = await getUserById({ id });

      if (!user) {
        next();
      }
      req.user = user;
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { attachUserToRequest };
