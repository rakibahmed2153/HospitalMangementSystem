var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from department where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "SELECT * FROM department";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from `admin` where username=? and password=?";
		db.getResult(sql,[user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
			//callback(results);
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO department VALUES (?,?,?)";
		db.execute(sql,[user.deptname, user.description,''], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `department` SET `dname`= ?,`description`= ? WHERE `id` = ?";
		db.execute(sql, [user.deptname, user.description, user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `department` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}