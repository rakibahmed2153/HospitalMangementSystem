var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from`notice` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "SELECT * FROM`notice`";
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
		var sql = "INSERT INTO `notice` VALUES (?,?,?)";
		db.execute(sql,['',user.tname, user.tmess], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `notice` SET `title`= ?,`message`= ? WHERE `id` = ?";
		db.execute(sql, [user.tname, user.tmess, user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `notice` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}