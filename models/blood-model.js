var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from `bloodbank` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "SELECT * FROM `bloodbank`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from `bloodbank` where nname=? and password=?";
		db.getResult(sql,[user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO `bloodbank` VALUES (?,?,?,?,?,?,?)";
		db.execute(sql,['',user.name, user.number,user.email,user.group,user.amount,user.address], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `bloodbank` SET `name`= ?,`number`= ?,`email`= ?,`bloodGroup`= ?,`amount`= ?,`address`= ? WHERE `id` = ?";
		db.execute(sql, [user.name, user.number,user.email,user.group,user.amount,user.address,user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `bloodbank` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}