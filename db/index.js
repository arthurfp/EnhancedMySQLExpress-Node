const mysql = require('mysql');
const config = require('../config');

// Create database connection object
const db = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports = db;