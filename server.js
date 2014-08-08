#!/bin/env node
var app = require('tuzi');
app.listen(process.env.PORT, function () {
  console.log('listening on port', process.env.PORT);
});
