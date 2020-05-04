//This line reads the .env file and sets them all as process.env.VARIABLE_NAME
require('dotenv').config();

var mysql = require('mysql');


console.log("MYSQLDB_CONN")
console.log(process.env.MYSQLDB_CONN)
console.log(process.env.MYSQLDB_PASS)
console.log(process.env.MYSQLDB_USER)

var con = mysql.createConnection({
  host: process.env.MYSQLDB_CONN,
  password: process.env.MYSQLDB_PASS,
  user: process.env.MYSQLDB_USER,
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});