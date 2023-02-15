const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT_SECRET } = process.env;

async function createUser({ email, password }) {
  try {
    password = await bcrypt.hash(password, saltRounds);

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(email, password)
    VALUES ($1, $2)
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email
    `,
      [email, password]
    );

    console.log('is this user?', user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUser() {}

async function getUserById() {}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE email = $1
    `,
      [email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function authenticateUser({ email, password }) {
  try {
    const user = await getUserByEmail(email);
    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      return await generateToken(user);
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

async function generateToken({ id }) {
  return {
    token: jwt.sign({ id: id }, JWT_SECRET),
    message: "You're logged in!",
  };
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  authenticateUser,
};
