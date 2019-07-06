var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from `nurse` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getByUn: function(user, callback){
		var sql = "select * from `nurse` where nname=?";
		db.getResult(sql, [user.unname], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "SELECT * FROM `nurse`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from `nurse` where nname=? and password=?";
		db.getResult(sql,[user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO `nurse` VALUES (?,?,?,?,?,?)";
		db.execute(sql,['',user.nrname, user.nrnum,user.nremail,user.nraddress,user.nrpassword], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `nurse` SET `nname`= ?,`number`= ?,`email`= ?,`address`= ? WHERE `id` = ?";
		db.execute(sql, [user.nrname,user.nrnum,user.nremail,user.nraddress,user.id], function(status){
			callback(status);
		});
	},
	updatePro: function(user, callback){
		var sql = "UPDATE `nurse` SET `number`= ?,`email`= ?,`address`= ? WHERE `nname` = ?";
		db.execute(sql, [user.number,user.email,user.address,user.id], function(status){
			callback(status);
		});
	},
    updatePass: function(user, callback){
		var sql = "UPDATE `nurse` SET `password`= ? WHERE `nname` = ?";
		db.execute(sql, [user.password,user.id], function(status){
			callback(status);
		});
	},

	delete: function(id, callback){
		var sql = "DELETE FROM `nurse` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}