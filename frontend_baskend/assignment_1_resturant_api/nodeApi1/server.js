var express 	= require('express');
var app 		= express();
var bodyParser  = require('body-parser');
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var User     	= require('./app/models/user');
var port 		= process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
 Authorization');
 next();
 });

app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect('mongodb://kevinadeya:modulus@jello.modulusmongo.net:27017/e3howiPy');



 app.get('/', function(req, res) {
 	res.send('Welcome to the home page!');
 });

var apiRouter = express.Router();

 apiRouter.get('/', function(req, res) {
 	res.json({ message: 'hooray! welcome to our api!' });
 });

// require routes files
 require('./app/routes/userApi')(apiRouter);
require('./app/routes/restaurantApi')(apiRouter);

 app.use('/api', apiRouter);


app.listen(port, function() {
  console.log('SERVER RUNNING... PORT: ' + port);
})