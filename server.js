//This line reads the .env file and sets them all as process.env.VARIABLE_NAME
require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3000



//Middleware that helps you parse req.body to get data from post requests
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const rootDirName = { root: __dirname }

const path = require('path')
// app.use('/', express.static(path.join(__dirname, 'public')))

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
	data.thisWasntHereBefore = "Zintis was here"
	res.json(data)
})

//This allows the app to listen to incoming http calls
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
