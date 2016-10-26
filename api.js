var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");
var db = require('./db');

app.get('/listUsers', function (req, res) {
    db.query('SELECT * FROM `TABLE 1`', function(err, rows, fields){
        //console.log(rows);
        res.end(fields);
    });
   /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });*/
})
app.get('/',function(req,res) {
    db.query('SELECT ENES1 FROM `TABLE 1`',function(err,rows,fields){
        res.end(rows)
    })
})
var server = app.listen(8081/*, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
}*/)
/*
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      var user = data["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})
*/
