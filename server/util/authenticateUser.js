const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../db/users');

async function authenticateUser({ email, password }) {
  try {
    const user = await getUserByEmail({ email });
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      return {
        token: jwt.sign({ id: user.user_id }, JWT_SECRET),
        message: "You're logged in!",
      };
    } else {
      return {
        name: 'Incorrect Credentials',
        message: 'email or password are incorrect',
      };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { authenticateUser };
