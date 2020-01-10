var express = require('express');
var adminmodel= require.main.require('./model/adminmodel');
var customermodel= require.main.require('./model/customermodel');
var router = express.Router();


router.get('/', function(req, res){


  res.render('login');
    
});







router.post('/',function(req,res){
    if(req.body.uname==""|| req.body.upass==""){
        res.redirect('login');
    }
    else{
    
    
    var user={
        username: req.body.uname,
        password:req.body.upass
    }
    
    adminmodel.validate(user,function(result){
        if(result!="" && result.type=="admin"){
            req.session.un=req.body.uname;
            req.session.uid=result.id;
            res.render('admin/dashboard');
            
            console.log('admin loggedin');
            
            
            
        }
        else if(result!="" && result.type=="customer"){
             req.session.un=req.body.uname;
            req.session.uid=result.id;
            
            console.log('customer logged in');
          
                     var data ={
                         uname:req.session.un
                     }
                    
            
                 res.render('customer/welcome',data);
            
                
                
            
            
            
            
            
            
            
            
            
            
            
           

        }
        else{
                        res.redirect('login');
            console.log('admin not found');
        }
        
        
    })
    
    
    }
});



router.get('/registercustomer',function(req,res){
    
    res.render('customer/customerregi');
    
})

router.post('/registercustomer',function(req,res){
   
    if(req.body.uname==""&& req.body.upass==""){
        
        
       res.redirect('/login/registercustomer') 
        
    }
    else {
    var data={
        
        username:req.body.uname,
        password:req.body.upass,
        type:"customer"
        
    }
    
    
customermodel.insert(data,function(success){
                     
     if(success){
       //  var data="registered successfully";
         res.render('login');
         console.log('data inserted');
         
     }    
    else{
        console.log('not inserted');
    }
    
    
                     })
    }
    
});

module.exports = router;

