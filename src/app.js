const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
var db

app.set('views', './src/vieuws');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./resources/'));

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
  cursor.toArray(function(err, result) {
  	console.log(result)
  	res.render("index", {
  		quotes: result
  	})
  })
})


/// This part saves the data from the form into the database
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
    	return (err)
    }
    console.log('saved to database')
    res.redirect('/')
  })
})

/// Only when i retrieve data from the database the app is listening op port 3000
MongoClient.connect('mongodb://paulvanmotman:Databaseiscool1!@ds011412.mlab.com:11412/star-wars-quotes28061989', (err, database) => {
	if (err) {
		return (err)
	}
	db = database
	app.listen(3000, function() {
		console.log('listening on 3000')
	})
})






