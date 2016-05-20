const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('/Users/Paul/dev/listapplication/src/vieuws/index.html')
})

app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})


app.listen(3000, function() {
	console.log('listening on 3000')
})