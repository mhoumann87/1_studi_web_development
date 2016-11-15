//gen an instance of the express router
var apiRouter = express.Router();

//basic route for our homepage
app.get('/', function(req, res) {
    res.send('Welcome to our homepage');
});

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
                }, superSecret
                );

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