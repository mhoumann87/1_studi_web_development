//SETUP

var express 	= require('express'); //server setup and routing
var app 		= express(); //define our app to use express
var bodyParser	= require('body-parser'); //pull POST content from http requests
var morgan		= require('morgan'); //log all requests to console
var mongoose	= require('mongoose'); //object modeling tool for mongoDB
var User 		= require('./app/models/user');
var port 		= process.env.PORT ||8080; //set up the port

//connect to the database
mongoose.connect('mongodb://resturant:code1234@waffle.modulusmongo.net:27017/Zo2qojaj')

//CONFIGURE THE APP

//use bodyparser in the app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure the app to use CORS requests (cros-origin resourse sharing)
app.use(function(req, res, next){
	res.setHeader('Acess-Control-Allow-Origin', '*');
	res.setHeader('Acess-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Acess-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
	next();
});

//use morgan to log all request to console log
app.use(morgan('dev'));


//DEFINE THE ROUTES

//Basic route for the homepage
app.get('/', function(req, res) {
	res.send('Welcome to the homepage');
});

//Get an instance of the express router
var apiRouter = express.Router();

//Middelware for all requests
apiRouter.use(function(req, res, next) {
	//log something is happening
	console.log('The app is in use');
	next();
});

//Routes for users

//Route http://localhost:8080/api/users
apiRouter.route('/users')

//create user
.post(function(req, res) {
	//create a new instance of the user model
	var user = new User();
	
	//get user information
	user.name 		= req.body.name;
	user.email 		= req.body.email;
	user.username	= req.body.username;
	user.password	= req.body.password;

	//save the user and check for errors
	user.save(function(err) {
		if (err) {
			//dublicate entry
			if (err.code = 11000)
				return res.json({sucess: false, message: 'A user with that username allready exists'});
			else
				return res.send(err);
		}

				res.json({message: 'User created'});
	});

})

.get(function(req, res) {
	User.find(function(err, users) {
		if (err) res.send(err);
		//return the user
		res.json(users);
	});
});





//REGISTER OUR ROUTES

//All our routes will be prefixed with /api
app.use('/api', apiRouter);




//START SERVER
app.listen(port);
console.log('Go to:'  + port);