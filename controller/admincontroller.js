var express = require('express');
var adminmodel= require.main.require('./model/adminmodel');
var customermodel= require.main.require('./model/customermodel');
var router = express.Router();

router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.render('login');
	}
});


router.get('/signout',function(req,res){
    req.session.un=null;
    res.render('login');
})

router.get('/addbook',function(req,res){
     if(req.session.un==""){
         res.redirect('login');
     }else{
    res.render('admin/addbook');
     }
})

router.post('/',function(req,res){
    
    var  data={
        Bookname:req.body.bname,
        Authorname:req.body.aname,
        Description:req.body.descript,
        Price:req.body.price,
        Category:req.body.cat  
    }
    
     console.log(req.body.aname);
     console.log(req.body.bname);
     console.log(req.body.descript);
     console.log(req.body.price); console.log(req.body.cat);
    
    
    adminmodel.addbook(data, function(success){
        if(success){
            console.log('inserted');
           res.render('admin/addbook');
        }
        else{
            console.log("not inserted");
            
        }
    })
    
    
    
});

router.get('/showuser',function(req,res){
    if(req.session.un==null){
        res.redirect('login');
    }else{
    
    
    adminmodel.getusers(function(results){
        
        var data={
            uList:results
        }
        
        
      res.render('admin/showuser',data);  
    });
   
    
    }
    
});


router.get('/showbook',function(req,res){
    adminmodel.showbook(function(results){
        
        var data={
            
            uList:results
        }
        
        res.render('admin/showbook',data);
        
    })
    
    
    
});

router.get('/register',function(req,res){
    
    res.render('admin/registeradmin');
    
    
    
})

router.post('/register',function(req,res){
    
    var data={
        
        username:req.body.uname,
        password:req.body.upass,
        type:req.body.utype
    }
    
adminmodel.registeruser(data,function(success){
    if(success){
        console.log("insererted");
        res.render('admin/registeradmin');
        
    }
})
    
})


router.get('/myprofile',function(req,res){
    
    adminmodel.myprofile(req.session.uid,function(result){
        
        res.render('admin/myprofile',result);
        
    })
    
})

router.get('/bookedit/:id',function(req,res){
    
    adminmodel.bookdata(req.params.id, function(result){

		if(result != ""){
			res.render('admin/edit', result);
		}else{
			res.redirect('admin/showbook');
		}
	});
   
    
});


router.post("/bookedit/:id", function(req, res){

	var user = {
		id: req.params.id,
		bookname: req.body.bname,
		authoursname: req.body.aname,
		description: req.body.descript,
        price:req.body.price,
        catagory:req.body.cat
	};

	adminmodel.bookupdate(user, function(status){

		if(status){
			res.redirect('/admin/showbook');
		}else{
			res.redirect('/admin/edit:'+req.params.id);
		}
	});
});

router.get('/bookdelete/:id', function(req, res){

	adminmodel.bookdata(req.params.id, function(result){

		if(result != ""){
			res.render('admin/deletebook', result);
		}else{
			res.redirect('/admin/showbook');
		}
	});
});

router.post("/bookdelete/:id", function(req, res){

	var user = {
		id: req.params.id,
		
	};

	adminmodel.bookdelete(user, function(status){

		if(status){
			res.redirect('/admin/showbook');
		}else{
			res.redirect('/admin/deletebook:'+req.params.id);
		}
	});
});



//user edit delete starts here



router.get('/useredit/:id', function(req, res){

	adminmodel.userdata(req.params.id, function(result){

		if(result != ""){
			res.render('admin/useredit', result);
		}else{
			res.redirect('/admin/showuser');
		}
	});
});




router.post("/useredit/:id", function(req, res){

	var user = {
		id: req.params.id,
		username: req.body.uname,
		password: req.body.upass,
		type: req.body.type
        
	};

	adminmodel.userupdate(user, function(status){

		if(status){
			res.redirect('/admin/showuser');
		}else{
			res.redirect('/admin/useredit:'+req.params.id);
		}
	});
});
















router.get('/userdelete/:id', function(req, res){
     var data ={
         
         id:req.params.id
     }
	adminmodel.userdata(data, function(result){

		if(result != ""){
			res.render('admin/deleteuser', result);
		}else{
			res.redirect('/admin/showuser');
		}
	});
});

router.post("/userdelete/:id", function(req, res){

	var data = {
		id: req.params.id,
		
	};

	adminmodel.userdelete(data, function(status){

		if(status){
			res.redirect('/admin/showuser');
		}else{
			res.redirect('/admin/deleteuser:'+req.params.id);
		}
	});
});



router.get('/order',function(req,res){
     customermodel.purchasetable(function(results){
        
        var data={
            
            uList:results
        }
        
        res.render('admin/order',data);
        
    })
    
    
})




module.exports = router;
