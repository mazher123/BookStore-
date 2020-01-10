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



router.get('/home',function(req,res){
    
      adminmodel.showbook(function(results){
                
                
                var data={
                    uList:results,
                    name:req.session.un
                }
                
                res.render('customer/home',data);
                
                });
    
    
})


router.get('/details/:id',function(req,res){
    
    
    var data={
        
        id:req.params.id
    }
    
  console.log("reached", data.id);
    
    customermodel.custbookdata(data,function(result){
        
        res.render('customer/details',result);
    })
    
    
});



router.get('/myprofile',function(req,res){
    
    customermodel.custoprofile(req.session.uid,function(result){
        
        res.render('customer/custoprofile',result);
        
    })
    
});

router.get('/searchcat/:catagory',function(req,res){
     
    var catagory={
        cat:req.params.catagory
    }
  //  console.log(catagory);
    customermodel.category(catagory,function(result){
        
            var data={
                uList:result
            }
        
        
        res.render('customer/catagory',data);
        
        
    })
    
})



router.post('/buy/:bookname/:price',function(req,res){
      var data={
          name:req.session.un,
          bookname:req.params.bookname,
          price:req.params.price,
          quantity:req.body.quantity
      }

      console.log(req.params.bookname);console.log(req.session.un);
      customermodel.order(data,function(success){
          
          
          if(success){
              console.log("inserted");
              
              res.render('customer/order');
              
              
          }else{
              console.log('not inserted');
          }
      })

});


router.get('/books',function(req,res){
    adminmodel.showbook(function(results){
        
        var data={
            
            uList:results
        }
        
        res.render('customer/books',data);
        
    })
    
    
    
});


router.get('/order',function(req,res){
     customermodel.purchasetable(function(results){
        
        var data={
            
            uList:results
        }
        
        res.render('customer/placeorder',data);
        
    })
    
    
})


module.exports = router;