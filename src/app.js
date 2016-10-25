// Requring node modules
const express = require('express');
const bodyParser= require('body-parser')
const app = express();

// Require function exported in query_db.js
var query = require('../resources/js/query_db');

// Setting the view to jade files
app.set('views', './src/vieuws');
app.set('view engine', 'jade');

// Use bodyparser to take input from request.body
app.use(bodyParser.urlencoded({extended: true}))
// Sending a folder of static files to the client side
app.use(express.static('./resources/'));

/// This part renders the form 
app.get('/', (req, res) => {
  res.render("index")
 })

/// This part renders the data from the database
app.get('/view', (req, res) => {
  // Select all rows from messages
  query('select * from messages', function (error, result) {
    console.log(result.rows);
    // render the view with the data from the database
    res.render("view", {
      input: result.rows
    })
  })
 })


/// This part saves the data from the form into the database
app.post('/quotes', (req, res) => {
  // postgres query to store [req.body.name, req.body.quote], using ($1, $2), in the database
  query('insert into messages (title, body) values ($1, $2)', [req.body.name, req.body.quote], function (error, result) {
    // check for errors
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






