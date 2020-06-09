//This line reads the .env file and sets them all as process.env.VARIABLE_NAME
require('dotenv').config();

var MongoClient = require('mongodb').MongoClient;

console.log()
console.log("process.env.MONGODB_CONN")
console.log(process.env.MONGODB_CONN)

// Connect to the db
MongoClient.connect(process.env.MONGODB_CONN, function (err, db) {
   
    if(err) throw err;
		console.log()
    console.log("mongo connected!")
     //Write databse Insert/Update/Query code here..
                
});

module.exports = MongoClient;