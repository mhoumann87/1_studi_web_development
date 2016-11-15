//BASE SETUP
//------------------------------------------------------------------

// CALL THE PACKAGES
//-------------------------------------------------------------------

var express                 = require('express');
var app                     = express();
var configure               =require('./config');
var bodyParser              = require('body-parser');
var morgan                  = require('morgan');
var mongoose                = require('mongoose');
var jwt                     = require('jsonwebtoken');
var User                    = require('./app/models/user');

//connect to the database on modulous.io
mongoose.connect(config.database)


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



//middelware to use for all requests
apiRouter.use(function(req, res, next) {
    //do loggin
    console.log('Our API is in use');

    //check for a token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decode token
    if (token) {

        //verifies token
        jwt.verify(token, superSecret, function(err, decoded){
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            } else {

                //if everything is good, save to request for use in other routes
                req.decoded = decoded;

                next();
            }
        });
    } else {

        //if there is no token
        //return a HTTP rosponse of 403 (access forbidden) and an error message
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});

//on routes that ends in /users
//------------------------------------------------------------------------------
apiRouter.route('/users')

        //create a user(POST)
        .post(function(req, res) {
            
            //create a new instance of the User models
            var user = new User();

            //set the user information (comes from the request)
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;

            //save the user and check for errors
            user.save(function(err){
                if (err) {
                    //dublicate entry
                    if (err.code == 11000)
                    return res.json({ sucess: false, message: 'A user with that usernamea already exists'});
                    else
                        return res.send(err);
                }
                        res.json({message: 'User created'});
            });
        })

        //get all the users (GET)
        .get(function(req, res) {
            User.find(function(err, users) {
                if (err) res.send(err);
                   
                    //return the users
                    res.json(users);
            });
        });

    //get single user, routes that ends in /users/:user_id
    apiRouter.route('/users/:user_id')

        //get the user with that id
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);

                //return that user
                res.json(user);
            });
        })

        //change/update user (PUT)
        .put(function(req, res) {
            //find the user with user_id
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);

                //update the user if there are changes
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;

                //save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    //return a message
                    res.json( {message: 'User changed'} );
                });
            });
        })

        //delete the user with this user_id (DELETE)
        .delete(function(req, res) {
            User.remove( {
                _id: req.params.user_id
            }, function(err, user) {
                if (err) res.send(err);

                res.json( {message: 'User deleted'} )
            });
        });

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

app.listen(config.port);
console.log('Goto port ' + config.port);


