var http = require('http');
var express = require('express');
var app = express();
var db = require('./db');

app.set('view engine', 'jade');
app.set('views', './views');
app.get('/', function(req, res){
  db.query('SELECT * FROM `TABLE 1`', function(err, rows, fields){
    res.render('index', {categories : rows});
  });
});

app.listen(3000);
console.log('Running Express...');