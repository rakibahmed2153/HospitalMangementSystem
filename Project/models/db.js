var mysql = require('mysql');

var confiq = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hospital'
};

var getConnection = function(callback){

	var connection = mysql.createConnection(confiq);
	
	connection.connect(function(err) {
	  	if (err){
	  		console.log('Connection error...');
	  	}
	  	console.log('connected as id ' + connection.threadId);
	});

	callback(connection);
}

module.exports= {
	getResult: function(sql, params, callback){

		getConnection(function(connection){

			if(params != ""){
				connection.query(sql, params, function (error, results) {
					if(error){
						callback([]);
					}else{
						callback(results);					
					}
				});				
			}else{
				connection.query(sql, function (error, results) {
					if(error){
						callback([]);
					}else{
						callback(results);					
					}
				});	
			}
			connection.end(function(err) {
				console.log('connection ending....');
			});
		});
	},
	execute: function(sql, params, callback){

		getConnection(function(connection){

			if(params != ""){
				connection.query(sql, params, function (error, results) {
					if(error){
						callback(false);
					}else{
						callback(true);					
					}
				});
			}else{
				connection.query(sql, function (error, results) {
					if(error){
						callback(false);
					}else{
						callback(true);					
					}
				});
			}

			connection.end(function(err) {
				console.log('connection ending....');
			});
		});
	}
}




