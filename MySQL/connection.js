//This line reads the .env file and sets them all as process.env.VARIABLE_NAME
require('dotenv').config();

var mysql = require('mysql');

console.log()
console.log("process.env.MYSQLDB_CONN")
console.log(process.env.MYSQLDB_CONN)
console.log(process.env.MYSQLDB_PASS)
console.log(process.env.MYSQLDB_USER)

var MySqlClient = mysql.createConnection({
  host: process.env.MYSQLDB_CONN,
  password: process.env.MYSQLDB_PASS,
  user: process.env.MYSQLDB_USER,
  database: process.env.MYSQLDB_DB_NAME,
  port: 3306
});

MySqlClient.connect(function(err) {
  if (err) throw err;
	console.log()
  console.log("MySQL connected!");
});

module.exports = MySqlClient;