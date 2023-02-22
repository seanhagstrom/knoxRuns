const client = require('./client');
const seedActivities = require('../../resources/sample-activities.json');
const { createUser, updateUser } = require('./users');
const { addInitialActivitiesToDb } = require('../util');
const { createRole } = require('./roles');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS athlete_teams;
    DROP TABLE IF EXISTS coach_teams;
    DROP TABLE IF EXISTS teams;
    DROP TABLE IF EXISTS maps;
    DROP TABLE IF EXISTS lap_metrics;
    DROP TABLE IF EXISTS laps;
    DROP TABLE IF EXISTS activity_metrics;
    DROP TABLE IF EXISTS metrics;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS user_roles;
    DROP TABLE IF EXISTS roles;
    DROP TABLE IF EXISTS users;
    `);
    console.log('Finished droppping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log('Starting to create all tables...');
    await client.query(`
    CREATE TABLE users(
      user_id SERIAL PRIMARY KEY,
      strava_id INTEGER,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      username VARCHAR(255),
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      is_verified BOOLEAN DEFAULT false,
      email_allowed BOOLEAN DEFAULT true,
      verification_string VARCHAR(255) NOT NULL,
      refresh_token VARCHAR(255),
      access_token VARCHAR(255),
      expires_at INTEGER,
      bio TEXT,
      city VARCHAR(255),
      state VARCHAR(255),
      sex VARCHAR(20),
      weight NUMERIC(10,3),
      profile_image TEXT,
      created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE roles(
      role_id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE user_roles(
      user_id INTEGER REFERENCES users(user_id),
      role_id INTEGER REFERENCES roles(role_id),
      UNIQUE(user_id, role_id)
    );

    CREATE TABLE activities(
      activity_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      strava_activity_id VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      sport_type VARCHAR(255) NOT NULL,
      description TEXT
    );

    CREATE TABLE metrics(
      metric_id SERIAL PRIMARY KEY,
      elapsed_time INTEGER NOT NULL,
      moving_time INTEGER NOT NULL,
      start_date TIMESTAMP,
      distance INTEGER NOT NULL,
      total_elevation_gain INTEGER NOT NULL,
      average_speed INTEGER NOT NULL,
      max_speed INTEGER NOT NULL,
      average_cadence INTEGER NOT NULL,
      has_heartrate BOOLEAN DEFAULT false,
      elev_high INTEGER NOT NULL,
      elev_low INTEGER NOT NULL,
      calories INTEGER NOT NULL
    );

    CREATE TABLE activity_metrics(
      activity_id INTEGER REFERENCES activities(activity_id),
      metric_id INTEGER REFERENCES metrics(metric_id),
      UNIQUE(activity_id, metric_id)
      );

    CREATE TABLE laps(
      lap_id INTEGER PRIMARY KEY,
      activity_id INTEGER REFERENCES activities(activity_id)
    );

    CREATE TABLE lap_metrics(
      lap_id INTEGER REFERENCES laps(lap_id),
      metric_id INTEGER REFERENCES metrics(metric_id),
      UNIQUE(lap_id, metric_id)
    );

    CREATE TABLE maps(
      map_id SERIAL PRIMARY KEY,
      start_lat INTEGER NOT NULL,
      start_lng INTEGER NOT NULL,
      end_lat INTEGER NOT NULL,
      end_lng INTEGER NOT NULL,
      polyline TEXT,
      summary_polyline TEXT,
      activity_id INTEGER REFERENCES activities(activity_id)
    );

    CREATE TABLE teams(
      team_id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE coach_teams(
      coach_id INTEGER REFERENCES users(user_id),
      team_id INTEGER REFERENCES teams(team_id),
      UNIQUE(coach_id, team_id)
    );

    CREATE TABLE athlete_teams(
      athlete_id INTEGER REFERENCES users(user_id),
      team_id INTEGER REFERENCES teams(team_id),
      UNIQUE(athlete_id, team_id)
    );
    `);

    console.log(
      'Finished creating all tables successfully! Now, to add some data!'
    );
  } catch (error) {
    console.error('Error creating tables');
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log('Adding initial users to "Users" table...');
  try {
    await createUser({
      email: 'sean@sean.com',
      password: '123',
    });
    await createUser({ email: 'seanhagstrom1@gmail.com', password: '123' });
    console.log('Finished adding users!');
  } catch (error) {
    throw error;
  }
};

const createInitialRoles = async () => {
  console.log('Creating initial roles to the "Roles" table...');
  try {
    const rolesToAdd = ['athlete', 'coach', 'admin'];
    for (const name of rolesToAdd) {
      await createRole({ name });
    }
    console.log('Finished creating roles!');
  } catch (error) {
    throw error;
  }
};

(async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialRoles();
    await updateUser(2, {
      strava_id: 14994492,
      username: 'sean_hagstrom',
      firstname: 'Sean',
      lastname: 'Hagstrom',
      is_verified: true,
      email_allowed: true,
      verification_string: '3aa837ff-105b-4357-8e8c-d94319917006',
      refresh_token: '0faccecbc79b7e4f590f0099c9ca68aaca809e71',
      access_token: '7b63b50ff62eed732abf19eed5f706bd117cca38',
      expires_at: 1677019649,
      bio: null,
      city: 'Knoxville ',
      state: 'Tennessee ',
      sex: 'M',
      weight: '61.235',
      profile_image:
        'https://graph.facebook.com/10156899548270215/picture?height=256&width=256',
    });
    await addInitialActivitiesToDb(2, seedActivities);
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
})();
