const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({ username, password }) {
  try {
    console.log('i made it to the function');
    console.log('...What is happening?', username);
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

async function getUserByUsername() {}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
