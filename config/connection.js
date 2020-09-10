// Dependencies
const mysql = require('mysql');

// do not use const here
var connection;
if (process.env.JAWSDB_URL) {
    // Database is JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // Database is local 
    connection = mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'Nicky0416!',
        database: 'repair_db'
    })
};

// Connect to DB on startup
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("You're Customer # " + connection.threadId);
});

// Export connection for ORM to use.
module.exports = connection;
