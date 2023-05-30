const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: 'db',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'biblioteca_nacional'
})

module.exports = {
  dbConnection
};