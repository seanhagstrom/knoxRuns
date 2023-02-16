const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT_SECRET } = process.env;

async function createUser({ email, password, verificationString }) {
  try {
    password = await bcrypt.hash(password, saltRounds);

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(email, password, verificationString)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING
    RETURNING user_id, email, isVerified;
    `,
      [email, password, verificationString]
    );

    const createdUser = await generateToken(user);
    console.log('createdUser in createUser', createdUser);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserById({ id }) {
  try {
    if (!id) {
      return { name: 'Bad Token', message: 'Please login!' };
    } else {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT user_id, email, isVerified, created_on FROM users
        WHERE id = $1;
        `,
        [id]
      );
      return user;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
    console.log('getUserByEmail: ', user);
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

async function generateToken({ user_id }) {
  return {
    token: jwt.sign({ id: user_id }, JWT_SECRET),
    message: "You're logged in!",
  };
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  authenticateUser,
};
