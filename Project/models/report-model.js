var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from `report` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getByUn: function(user, callback){
		var sql = "select * from `report` where doctor=?";
		db.getResult(sql, [user.uname], function(result){
			callback(result);
		});
	},
    
    getByUn1: function(user, callback){
		var sql = "select * from `report` where name=?";
		db.getResult(sql, [user.uname], function(result){
			callback(result);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM `report`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from `report` where pname=? and password=?";
		db.getResult(sql,[user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO `report` VALUES (?,?,?,?)";
		db.execute(sql,['',user.name,user.date,user.details], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `report` SET `name`= ?,`date`= ?,`details`= ? WHERE `id` = ?";
		db.execute(sql, [user.name,user.date,user.details,user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `report` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}