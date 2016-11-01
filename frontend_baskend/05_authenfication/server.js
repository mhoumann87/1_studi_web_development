//BASE SETUP
//------------------------------------------------------------------

// CALL THE PACKAGES
//-------------------------------------------------------------------

var express                 = require('express');
var app                     = express();
var bodyParser              = require('body-parser');
var morgan                  = require('morgan');
var mongoose                = require('mongoose');
var User                    = require('./app/models/user');
var port                    = process.env.PORT || 8080;
//connect to the database on modulous.io
mongoose.connect('mongodb://michael-h:kode1234@waffle.modulusmongo.net:27017/d4iNuryp')


//App configuration
//----------------------------------------------------------------------

//use body-parser to grap information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure the app to use CORS requests
app.use(function(req, res, next){
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Acess-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Acess-Control-Allow-Headers', 'X-Requested-With,content-type, \
    Authorization');
    next();
});

//log all the requests to the console
app.use(morgan('dev'));


//ROUTES FOR OUR API
//---------------------------------------------------------------------------

//basic route for our homepage
app.get('/', function(req, res) {
    res.send('Welcome to our homepage');
});

//gen an instance of the express router
var apiRouter = express.Router();

//test route to see if everything is working
//accessed at GET http://localhost:8080/apiRouter
apiRouter.get('/', function(req, res) {
    res.json({message: 'The API is working'});
});

//REGISTER OUR ROUTES
//------------------------------------------------------------------------------

//all out routes will be prefixed with /apiRouter
app.use('/api', apiRouter);


//START THE SERVER
//-------------------------------------------------------------------------------

app.listen(port);
console.log('Goto port ' + port);


