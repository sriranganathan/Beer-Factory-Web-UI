var express = require('express');

var app = express();

app.use(express.static('public'));
app.listen(3000, console.log('Server up on localhost:3000'));
