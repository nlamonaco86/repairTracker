const mysql = require('mysql');

// do not use const here
var connection;

// check to see if it's on Heroku or localhost
(process.env.JAWSDB_URL ? connection = mysql.createConnection(process.env.JAWSDB_URL) : connection = mysql.createConnection({
          port: 3306,
          host: 'localhost',
          user: process.env.MYSQL_USERNAME,
          password: process.env.MYSQL_PASSWORD,
          database: 'repair_db'
      }) )

// Connect to DB on startup
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

// Export connection for ORM to use.
module.exports = connection;
