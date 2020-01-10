var db = require('./db');


module.exports = {
	myprofile: function(userId, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
    
    userdata: function(data, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [data.id], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
    
    
    bookdata: function(userId, callback){
		var sql = "select * from book where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
    
    
    
    showbook: function(callback){
		var sql = "select * from book";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	getusers: function(callback){
		var sql = "select * from user";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},
	addbook: function(data, callback){
		var sql = "insert into book values(null, ?, ?, ?,?,?)"
		db.execute(sql, [data.Bookname, data.Authorname, data.Description,data.Price,data.Category], function(success){
			callback(success);
		});
	},
    
    registeruser: function(data, callback){
		var sql = "insert into user values(null, ?, ?, ?)"
		db.execute(sql, [data.username, data.password, data.type], function(success){
			callback(success);
		});
	},
    
    
	bookupdate: function(user, callback){
		var sql = "update book set bookname=?, authorsname=?, description=? ,price=? ,catagory=? where id=?";
		db.execute(sql, [user.bookname, user.authoursname, user.description, user.price,user.catagory,user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	bookdelete: function(data, callback){
		var sql = "delete from book where id=?";
		db.execute(sql, [data.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
    
    
    
    userupdate: function(user, callback){
		var sql = "update user set username=?, password=?, type=? where id=?";
		db.execute(sql, [user.username, user.password, user.type,user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
    userdelete: function(data, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [data.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}