var db = require('./db');

module.exports={
    
    
    
  insert: function(data, callback){
		var sql = "insert into user values(null, ?, ?, ?)"
		db.execute(sql, [data.username, data.password,data.type], function(success){
			callback(success);
		});  
    
    
    
},
    
     custbookdata: function(data, callback){
		var sql = "select * from book where id=?";
		db.getResults(sql, [data.id], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
    custoprofile: function(userId, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
    
    
     category: function(catagory, callback){
		var sql = "select * from book where catagory=?";
		db.getResults(sql, [catagory.cat], function(result){

			if(result.length >0){
                //console.log(result[0].bookname);
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
    
    
   order: function(data, callback){
		var sql = "INSERT INTO `purchased`(`id`, `customername`, `bookname`, `quantity`, `price`) VALUES (null,?,?,?,?)"
		db.execute(sql, [data.name, data.bookname,data.quantity,data.price], function(success){
			callback(success);
		});  
    
    
    
} ,
    
    
     purchasetable: function(callback){
		var sql = "select * from purchased";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
    
}