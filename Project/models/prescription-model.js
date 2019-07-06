var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from`prescription` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

	getByUn: function(user, callback){
		var sql = "select * from `prescription` where pname=?";
		db.getResult(sql, [user.uname], function(result){
			callback(result);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM `prescription`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from admin where username=? and password=?";
		db.getResult(sql,[user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO `prescription` VALUES (?,?,?,?)";
		db.execute(sql,['',user.name, user.problem, user.message], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `prescription` SET `pname`= ?,`problem`= ?,`prescription`= ? WHERE `id` = ?";
		db.execute(sql, [user.name, user.prob,user.message,user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `prescription` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}