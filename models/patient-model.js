var db = require('./db');

module.exports = {

	getById: function(id, callback){
		var sql = "select * from`patient` where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getByUn: function(user, callback){
		var sql = "select * from `patient` where doctor=?";
		db.getResult(sql, [user.uname], function(result){
			callback(result);
		});

	},
    
    getByUn1: function(user, callback){
		var sql = "select * from `patient` where pname=?";
		db.getResult(sql, [user.uname], function(result){
			callback(result);
		});

	},
        

	getAll: function(callback){
		var sql = "SELECT * FROM `patient`";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	validate: function(user, callback){
		var sql = "select * from `patient` where pname=? and password=?";
		db.getResult(sql,[user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	create: function(user, callback){
		var sql = "INSERT INTO`patient` VALUES (?,?,?,?,?,?,?)";
		db.execute(sql,['',user.pctname, user.pctnum,user.pctprob,user.pctdoct,user.pctaddress,user.pctpass], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "UPDATE `patient` SET `pname`= ?,`number`= ?,`problem`= ?,`doctor`= ?,`address`= ? WHERE `id` = ?";
		db.execute(sql, [user.pctname,user.pctnum,user.pctprob,user.pctdoct,user.pctaddress,user.id], function(status){
			callback(status);
		});
	},

	updatePro: function(user, callback){
		var sql = "UPDATE `patient` SET `number`= ?, `doctor`=?,`address`= ? WHERE `pname` = ?";
		db.execute(sql, [user.number,user.doctor,user.address,user.id], function(status){
			callback(status);
		});
	},

    updatePass: function(user, callback){
		var sql = "UPDATE `patient` SET `password`= ? WHERE `pname` = ?";
		db.execute(sql, [user.password, user.id], function(status){
			callback(status);
		});
	},
    
	delete: function(id, callback){
		var sql = "DELETE FROM `patient` WHERE id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}