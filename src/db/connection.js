const mysql = require('mysql2/promise');

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  DATABASE,
} = process.env;

const dbConnection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: DATABASE,
})

module.exports = {
  dbConnection
};