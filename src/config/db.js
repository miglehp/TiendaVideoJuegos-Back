const mysql = require('mysql2');

import 'dotenv/config';

const dbPort = Number(process.env.DBport) ?? 3306;

const pool = mysql.createPool({
  host: process.env.DBhost,
  user: process.env.DBuser,
  password: process.env.DBpassword,
  port: dbPort,
  database: process.env.DBdatabase,
});

const db = pool.promise();

module.exports = db;