var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from `doctor` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getByUn: function(user, callback){
		var sql = "select * from `doctor` where dname=?";
		db.getResult(sql, [user.unname], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "SELECT * FROM `doctor`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from doctor where dname=? and password=?";
		db.getResult(sql,[user.username,user.password], function(results){
          
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
			//callback(results);
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO `doctor` VALUES (?,?,?,?,?,?,?)";
		db.execute(sql,[user.docname, user.docnum,user.docemail,user.docdepartment,user.docaddress,user.docpass,''], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `doctor` SET `dname`= ?,`number`= ?,`email`= ?,`department`= ?,`address`= ? WHERE `id` = ?";
		db.execute(sql, [user.docname,user.docnum,user.docemail,user.docdepartment,user.docaddress,user.id], function(status){
			callback(status);
		});
	},
	updatePro: function(user, callback){
		var sql = "UPDATE `doctor` SET `number`= ?,`email`= ?,`address`= ? WHERE `dname` = ?";
		db.execute(sql, [user.number,user.email,user.address,user.id], function(status){
			callback(status);
		});
	},
	updatePass: function(user, callback){
		var sql = "UPDATE `doctor` SET `password`= ? WHERE `dname` = ?";
		db.execute(sql, [user.password,user.id], function(status){
			callback(status);
		});
	},
	
	delete: function(id, callback){
		var sql = "DELETE FROM `doctor` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}