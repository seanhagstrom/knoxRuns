const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT_SECRET } = process.env;
const { authenticateUser } = require('../util/authenticateUser');
const { buildSetString } = require('../util/buildSetString');

// Start Create User
async function createUser({
  email,
  password,
  verification_string,
  profile_image,
}) {
  try {
    password = await bcrypt.hash(password, saltRounds);

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(email, password, verification_string, profile_image)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO NOTHING
    RETURNING user_id, email, is_verified;
    `,
      [email, password, verification_string, profile_image]
    );

    const createdUser = {
      token: jwt.sign({ id: user.user_id }, JWT_SECRET),
      message: "You're logged in!",
    };
    console.log('createdUser in createUser', createdUser);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/*** Start Get User Functions ***/
async function getUserById({ id }) {
  try {
    if (!id) {
      return { name: 'Bad Token', message: 'Please login!' };
    } else {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT * FROM users
        WHERE user_id = $1;
        `,
        [id]
      );
      console.log('restrict what you get back in db/users getUserByID');
      return user;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserByEmail({ email }) {
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
    console.error(error);
    throw error;
  }
}
/*** End Get User Functions ***/

/*** Start Update User  ***/
async function updateUser(id, fields = {}) {
  const setString = await buildSetString(fields);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
    UPDATE users
    SET ${setString}
    WHERE user_id = ${id}
    RETURNING *;
    `,
      Object.values(fields)
    );

    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
};
