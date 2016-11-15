//Get the packages we need for the model
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;
var bcrypt		= require('bcrypt-nodejs');

//for the schema

var UserSchema = new Schema({
	name: String,
	email: String,
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true, select: false}
});

//encrypt the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;

	//only hash the password if the user is new or the password is changed
	if (!user.isModified('password')) return next();

	//generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		//change the password to the changed version
		user.password = hash;
		next();
	});
});

//Methode to compare the a given password with the database hashed for authification purpesies
//UserSchema.methods.comparePassword = function(password) {
//	var user = this;

//	return bcrypt.compareSync(password, user.password);
//};

//return the model
module.exports = mongoose.model('User', UserSchema);



