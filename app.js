#!/bin/env node
var express = require('express');
var url = require('url');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var livereload = require('tiny-lr');

var app = module.exports = express();

// Auto render templates
var extension = 'html';
var dotExtension = '.' + extension;
var extReg = new RegExp('\\' + dotExtension + '$');
var dir = 'public';
app.set('views', '.');
app.engine(extension, ejs.__express);
app.use(function(req, res, next) {
  var pathname = url.parse(req.url).pathname;
  pathname = path.join(dir, pathname);

  fs.lstat(pathname, function(err, stats) {
    // Requests that match /dir will be interpreted as /dir/index
    if (!err && stats.isDirectory()) {
      pathname = path.join(pathname, 'index');
    }
    if (!extReg.test(pathname)) {
      pathname += dotExtension;
    }

    fs.lstat(pathname, function(err, stats) {
      if(!err && stats.isFile()) {
        res.render(pathname, {environment: 'development'});
      } else {
        next();
      }
    });
  });
});

app.use(express.static(dir));
app.use('/lib', express.static('bower_components'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(livereload.middleware({app: app}));

process.env.PORT = process.env.PORT || 3000;
if (!module.parent) {
  app.listen(process.env.PORT);
  console.log('listening on port', process.env.PORT);
}
