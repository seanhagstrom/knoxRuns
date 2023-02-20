const client = require('./client');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT_SECRET } = process.env;
const { buildSetString } = require('../util/buildSetString');

// Start Create User
async function createUser({ email, password }) {
  try {
    const verification_string = uuidv4();

    password = await bcrypt.hash(password, saltRounds);

    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(email, password, verification_string)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING
    RETURNING user_id, email, is_verified, verification_string ;
    `,
      [email, password, verification_string]
    );

    const createdUser = {
      token: jwt.sign({ id: user.user_id }, JWT_SECRET),
      message: "You're logged in!",
      verification_string: user.verification_string,
    };
    console.log('createdUser in createUser', createdUser);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/*** Start Get User Functions ***/
/*** Consolidate these functions into findOne(field = {}) ***/
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
async function getUserByUUID({ verification_string }) {
  try {
    console.log(verification_string);
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE verification_string = $1
    `,
      [verification_string]
    );
    console.log('getUserByUUID: ', user);
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
  getUserByUUID,
};
