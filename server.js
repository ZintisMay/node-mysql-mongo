//This line reads the .env file and sets them all as process.env.VARIABLE_NAME
require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const MySqlClient = require("./MySQL/connection.js")
const MongoClient = require("./Mongo/connection.js")



//Middleware that helps you parse req.body to get data from post requests
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// This object is used in sendFile to say where the root directory is, to find the file to send
const rootDirName = { root: __dirname }

// @#@#@#
// const path = require('path')
// app.use('/', express.static(path.join(__dirname, 'public')))

//@#@#@# Charlie's Magic
//app.use(express.static('./public'))
//app.use(express.json({ limit: '1mb' })); // turns data received from client into json



//This sets a static directory that users can access files from. Usually CSS, JS, Images
app.use(express.static('public'))

let dummyDataJSON = {
	key:"value",
	num: 42,
	array: ['a', 'b', 'c'],
	obj: {
		w: "x",
		y: "z"
	}
}

// You can use a root object to set the root directory for files to send
app.get('/', (req, res) => res.sendFile('/index.html', rootDirName))

// Sample get route
app.get('/get', (req, res) => res.send('Found the get route!'))

// Sample param route, fires it back at you!
app.get('/params/:id', (req, res) => res.send('Your ID is: ' + req.params.id))

//Sample get route with dummy data. Sends a JSON from server
app.get('/dummyData', (req, res) => res.json(dummyDataJSON))

// Sample post route
app.post('/post', (req, res) => {
	var data = req.body
	console.log(req.body)
	data.thisWasntHereBefore = "Zintis was here"
	res.json(data)
})

app.get('/showAllMySqlDb', (req, res) => {
	MySqlClient.query("show databases", (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.send("see terminal")
  });
})

app.get('/showAllTables', (req, res) => {
  var sql = `SHOW TABLES`;
  MySqlClient.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Tables Listed");
    console.log(result);
    res.json(result)
  });
})

app.get('/createCustomerTable', (req, res) => {
  var sql = "CREATE TABLE IF NOT EXISTS customers (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), address VARCHAR(255), primary key (id))";
  MySqlClient.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table Created");
    res.json(result)
  });
})

app.get('/deleteCustomerTable', (req, res) => {
  var sql = "DROP TABLE customers";
  MySqlClient.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table Dropped");
    res.json(result)
  });
})

//This allows the app to listen to incoming http calls
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
