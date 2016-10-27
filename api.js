var http = require('http');
var express = require('express');
var app = express();
var db = require('./db');


app.get('/', function(req, res){
  db.query('SELECT COL 1 FROM `TABLE 1`', function(err, rows, fields){
    res.end(err.toString())
  });
});

app.get('/countsections/:class',function(req,res){
    db.query("SELECT `TABLE 1`.`COL 1` FROM `TABLE 1` WHERE `TABLE 1`.`COL 1`='"+req.params.class+"'",function(err,rows,fields){
        res.end(JSON.stringify(rows))
    });
})
app.listen(3000);
console.log('Running Express...');