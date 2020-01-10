//DECLARATION
var express  		= require('express');

var login= require('./controller/login');
var admin =require('./controller/admincontroller');
var customer=require('./controller/customercontroller');














var json= require('json');

var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var path= require('path');
var app 			= express();


//CONFIGURATION
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'view'));

app.use(express.static(path.join(__dirname, '/assets')));
//app.use("/assets", express.static(__dirname + '/assets'));










//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret', saveUninitialized: true, resave: false}));
app.use(cookieParser());



app.use('/login',login);
app.use('/admin',admin);
app.use('/customer',customer);















app.use('/assets', express.static('ext'))

//ROUTES





//ROUTES
app.get('/', (req, res)=> res.send('index page'));


//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});