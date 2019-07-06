var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from `bed` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

	getByUn: function(user, callback){
		var sql = "select * from `bed` where name=?";
		db.getResult(sql, [user.uname], function(result){
			callback(result);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM `bed`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from `bed` where nname=? and password=?";
		db.getResult(sql,[user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO `bed` VALUES (?,?,?,?)";
		db.execute(sql,['',user.name, user.word,user.bednum], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `bed` SET `name`= ?,`word`= ?,`bedno`= ? WHERE `id` = ?";
		db.execute(sql, [user.name,user.word,user.bednum,user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `bed` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}