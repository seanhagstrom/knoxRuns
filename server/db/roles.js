const client = require('./client');

async function createRole({ name }) {
  try {
    const {
      rows: [role],
    } = await client.query(
      `
    INSERT INTO roles(name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `,
      [name]
    );

    return role;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { createRole };
