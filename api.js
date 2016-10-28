var http = require('http');
var express = require('express');
var app = express();
var db = require('./db');


app.get('/', function(req, res){
  db.query('SELECT COL 1 FROM `TABLE 1`', function(err, rows, fields){
    res.end(err.toString())
  });
});

app.get('/grades/:class',function(req,res){
    var grades_request = ["SELECT",
                     "`TABLE 1`.`COL 1`,",
                     "`TABLE 1`.`COL 4`,",
                     "`TABLE 1`.`COL 5`,",
                     "`TABLE 1`.`COL 6`,",
                     "`TABLE 1`.`COL 7`,",
                     "`TABLE 1`.`COL 8`,",
                     "`TABLE 1`.`COL 9`,",
                     "`TABLE 1`.`COL 10`,",
                     "`TABLE 1`.`COL 11`,",
                     "`TABLE 1`.`COL 12`,",
                     "`TABLE 1`.`COL 13`,",
                     "`TABLE 1`.`COL 14`,",
                     "`TABLE 1`.`COL 15`,",
                     "`TABLE 1`.`COL 16`,",
                     "`TABLE 1`.`COL 17`,",
                     "`TABLE 1`.`COL 18`,",
                     "`TABLE 1`.`COL 19`",
                     "FROM `TABLE 1`",
                     "WHERE `TABLE 1`.`COL 1`='",
                     req.params.class,
                     "'"].join("");
    //console.log(grades_request)
    db.query(grades_request,function(err,rows,fields){
        //console.log(rows.length)
        //for(i = 0; i < rows.length; i++) {
            //console.log(rows[i])
        //}
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(rows))
    });
})
app.listen(3000);
console.log('Running Express...');