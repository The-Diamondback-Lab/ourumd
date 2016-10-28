var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/class/:class', function (req, res) {
    fs.readFile( __dirname + "/" + "test_db.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var user = data[req.params.class] 
        console.log( user );
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end( JSON.stringify(user));
    });
})

app.get('/prof/:prof/:class',function(req,res) {
    fs.readFile( __dirname + "/" + "test_db.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var user = data[req.params.class]
        var result = {};
        for(var k in user){
            curr = user[k]
            if(curr["prof"] == req.params.prof){
                console.log(curr["prof"])
                result[k] = curr;
            }
        }
            
        console.log( user);
        
        res.end(JSON.stringify(result));
    });
})

var server = app.listen(8081);