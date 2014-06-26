#!/bin/env node
var express = require('express');
var app = express();
app.use(express.static('public'));
app.use('/lib', express.static('bower_components'));
process.env.PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, function () {
  console.log('listen on port', process.env.PORT);
});
