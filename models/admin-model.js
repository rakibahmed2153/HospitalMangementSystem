var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from `admin` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "SELECT * FROM `admin`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from admin where username=?";
		db.getResult(sql,[user.unname], function(results){
          /*
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}*/
			callback(results);
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO `admin` VALUES (?,?,?,?,?,?)";
		db.execute(sql,['',user.name, user.password,user.number,user.email,user.address], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `admin` SET `username`= ?,`number`= ?,`email`= ?,`address`= ? WHERE `id` = ?";
		db.execute(sql, [user.name,user.number,user.email,user.address,user.id], function(status){
			callback(status);
		});
	},
	updatePro: function(user, callback){
		var sql = "UPDATE `admin` SET `number`= ?,`email`= ?,`address`= ? WHERE `username` = ?";
		db.execute(sql, [user.number,user.email,user.address,user.id], function(status){
			callback(status);
		});
	},
	updatePass: function(user, callback){
		var sql = "UPDATE `admin` SET `password`= ? WHERE `username` = ?";
		db.execute(sql, [user.password,user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `admin` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}