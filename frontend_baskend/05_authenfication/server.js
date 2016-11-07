//BASE SETUP
//------------------------------------------------------------------

// CALL THE PACKAGES
//-------------------------------------------------------------------

var express                 = require('express');
var app                     = express();
var bodyParser              = require('body-parser');
var morgan                  = require('morgan');
var mongoose                = require('mongoose');
var jwt                     = require('jsonwebtoken');
var superSecret             = 'ineverdrinkbeeroralcoholorsnaps';
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

//route to authenticate a user (/api/authenticate)
apiRouter.post('/authenticate', function(req, res) {

    //find the user
    User.findOne({
        username: req.body.username
    }).select('name, username, password').exec(function(err, user) {
        if (err) throw err;

        //no user with that username was found
        if (!user){
            res.json({
                success: false,
                message: 'Authentication failer. User not found'
            });
        } else if (user) {

            //check if passwordmatches
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json ({
                    success: false,
                    message: 'Authentication failed. Wrong Password'
                });
            } else {
                //if user is found and password are right , create a token
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, superSecret, {
                    expiresInMinutes: 1440 //expires in 24 hours
                });

                //return the information as json including the token
                res.json({
                    success: true,
                    message: 'Your token',
                    token: token
                });
            }
        }
    });
});

//middelware to use for all requests
apiRouter.use(function(req, res, next) {
    //do loggin
    console.log('Our API is in use');

    next();
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

app.listen(port);
console.log('Goto port ' + port);


