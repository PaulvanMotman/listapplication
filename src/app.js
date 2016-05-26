const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

var query = require('../resources/js/query_db');

app.set('views', './src/vieuws');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./resources/'));

/// This part renders the form 

app.get('/', (req, res) => {
  res.render("index")
 })

/// This part renders the data from the database

app.get('/view', (req, res) => {
  query('select * from messages', function (error, result) {
    console.log(result.rows);
    res.render("view", {
      input: result.rows
    })
  })
 })


/// This part saves the data from the form into the database
app.post('/quotes', (req, res) => {
  query('insert into messages (title, body) values ($1, $2)', [req.body.name, req.body.quote], function (error, result) {
    if (error) {
      throw error
    }
    console.log('saved to database')
    res.redirect('/view')
  })
})


app.listen(3000, function() {
    console.log('listening on 3000')
})






