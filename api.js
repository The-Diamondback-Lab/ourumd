var http = require('http');
var express = require('express');
var app = express();
var db = require('./db');

// API Endpoint to get all grade sums for a certain class
app.get('/grades/class/:class',function(req,res){
    // The data base request asking for every grade column possible with a givne professor
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
    //Create a javascript object to store all grade summed grade data in
    result = {"A":0,"A-":0,"A+":0,"B":0,"B+":0,"B-":0,"C":0,"C-":0,"C+":0,
                  "D":0,"D-":0,"D+":0,"Fs":0,"Withdraw":0,"Other":0}
    // Then the database query is acutally fired.
    db.query(grades_request,function(err,rows,fields){
        
        // For loop to go through all rows to give sums in all grade categories
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
        // Then we send the reult JSON back t
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(result))
    });
})

app.get('/grades/prof/:prof',function(req,res){
    // The data base request asking for every grade column possible with a given professor
    var grades_request = ["SELECT",
                     "`TABLE 2`.`Professor Name`,",
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
                     "WHERE `TABLE 2`.`Professor Name`='",
                     req.params.prof,
                     "'"].join("");
    //Create a javascript object to store all grade summed grade data in
    result = {"A":0,"A-":0,"A+":0,"B":0,"B+":0,"B-":0,"C":0,"C-":0,"C+":0,
                  "D":0,"D-":0,"D+":0,"Fs":0,"Withdraw":0,"Other":0}
    // Then the database query is acutally fired.
    db.query(grades_request,function(err,rows,fields){
        
        // For loop to go through all rows to give sums in all grade categories
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
        // Then we send the reult JSON back t
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(result))
    });
})

app.listen(3000);
console.log('Running Express...');