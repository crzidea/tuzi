#!/bin/env node
var express = require('express');
var url = require('url');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var program = require('commander');

program
  .option('-p, --port <n>', 'Server port', parseInt)
  .option('-l, --livereload', 'Livereload port')
  .parse(process.argv);

process.env.PORT = program.port || process.env.PORT || 3000;
if (program.livereload) {
  process.env.LIVERELOAD = true === program.livereload
                         ? (process.env.LIVERELOAD || 35729)
                         : program.livereload;
}

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
        var config = {environment: 'development'};
        if (program.livereload) {
          config.livereload = '//' + req.hostname + ':'
            + process.env.LIVERELOAD + '/livereload.js';
        }
        res.render(pathname, config);
      } else {
        next();
      }
    });
  });
});

app.use(express.static(dir));
app.use('/lib', express.static('bower_components'));

if (!module.parent) {
  app.listen(process.env.PORT);
  console.log('listening on port', process.env.PORT);
}
