const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT_SECRET } = process.env;

async function createUser({ username, password }) {
  try {
    password = await bcrypt.hash(password, saltRounds);

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username
    `,
      [username, password]
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

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username = $1
    `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function authenticateUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      return await generateToken(user);
    } else {
      return {
        name: 'Incorrect Credentials',
        message: 'Username or password are incorrect',
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
  getUserByUsername,
  authenticateUser,
};
