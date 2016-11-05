var http = require('http');
var express = require('express');
var app = express();
var db = require('./db');


app.get('/', function(req, res){
  res.end("Nothing here");
});

app.get('/grades/:class',function(req,res){
    var grades_request = ["SELECT",
                     "`TABLE 2`.`Course`,",
                     "`TABLE 2`.`Total`,",
                     "`TABLE 2`.`A`,",
                     "`TABLE 2`.`A-`,",
                     "`TABLE 2`.`A+`,",
                     "`TABLE 2`.`B`,",
                     "`TABLE 2`.`B-`,",
                     "`TABLE 2`.`B+`,",
                     "`TABLE 2`.`C`,",
                     "`TABLE 2`.`C-`,",
                     "`TABLE 2`.`C+`,",
                     "`TABLE 2`.`D`,",
                     "`TABLE 2`.`D-`,",
                     "`TABLE 2`.`D+`,",
                     "`TABLE 2`.`Fs`,",
                     "`TABLE 2`.`Withdraw`,",
                     "`TABLE 2`.`Other`",
                     "FROM `TABLE 2`",
                     "WHERE `TABLE 2`.`Course`='",
                     req.params.class,
                     "'"].join("");
    //console.log(grades_request)
    db.query(grades_request,function(err,rows,fields){
        //console.log(rows.length)
        result = {"A":0,"A-":0,"A+":0,"B":0,"B+":0,"B-":0,"C":0,"C-":0,"C+":0,
                  "D":0,"D-":0,"D+":0,"Fs":0,"Withdraw":0,"Other":0}
        
        for(i = 0; i < rows.length; i++) {
            result["A"] += parseInt(rows[i]["A"]);
            result["A-"] += parseInt(rows[i]["A-"])
            result["A+"] += parseInt(rows[i]["A+"])
            result["B"] += parseInt(rows[i]["B"])
            result["B-"] += parseInt(rows[i]["B-"])
            result["B+"] += parseInt(rows[i]["B+"])
            result["C"] += parseInt(rows[i]["C"])
            result["C-"] += parseInt(rows[i]["C-"])
            result["C+"] += parseInt(rows[i]["C+"])
            result["D"] += parseInt(rows[i]["D"])
            result["D-"] += parseInt(rows[i]["D-"])
            result["D+"] += parseInt(rows[i]["D+"])
            result["Fs"] += parseInt(rows[i]["Fs"])
            result["Withdraw"] += parseInt(rows[i]["Withdraw"])
            result["Other"] += parseInt(rows[i]["Other"])
        }
        
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(result))
    });
})
app.listen(3000);
console.log('Running Express...');