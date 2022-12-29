const { Client } = require('pg');
const pkg = require('../package.json');

const connectionString = `postgres://localhost:5432/${pkg.name}`;

const client = new Client({ connectionString });

module.exports = {
  client,
};
