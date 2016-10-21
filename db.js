var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '108.179.232.92',
  user     : 'dbklab_dbklab',
  password : 'dbklab',
  database : 'dbklab_testourumd'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
});

module.exports = connection;