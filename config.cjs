require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: 3000,
  },
  test: {
    database: 'Test DB Name',
    username: 'Test DB root name',
    password: 'Test DB password',
    host: 'Test DB host',
    dialect: 'postgres',
    port: 3000,
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT || 3000,
  },
};
