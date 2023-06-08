const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  DATABASE,
} = process.env;

module.exports = {
  "development": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": DATABASE + '_development',
    "host": MYSQL_HOST,
    "port": MYSQL_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": DATABASE + '_test',
    "host": MYSQL_HOST,
    "port": MYSQL_PORT,
    "dialect": "mysql"
  },
  "production": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": DATABASE + '_production',
    "host": MYSQL_HOST,
    "port": MYSQL_PORT,
    "dialect": "mysql"
  }
};
