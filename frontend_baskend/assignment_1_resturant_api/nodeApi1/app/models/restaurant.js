svar mongoose = require('mongoose');
var Schema    = mongoose.Schema;

var restaurantSchema   = new Schema({
	name:      { type: String, index: { unique: true }},
	address:    { type: String},
    zipcode:    { type: String},
    city:       { type: String},
    country:    { type: String},
    phone:      { type: String},
    email:      { type: String},
    foodType:    [String] 
});



var Restaurant = mongoose.model('Restaurant', restaurantSchema, 'Restaurant' );

module.exports = mongoose.model('Restaurant', restaurantSchema, 'Restaurant' );





/*var foodSchema = mongoose.Schema({

    appertizer: [String],
    main: [String],
    dessert: [String]
   });

var reviewSchema = mongoose.Schema({

    //rating: [Number, "default": 0, min:0, max:5],
    comments: [String],
    recommend: {boolen}
   });

var openingSchema = mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    //closed: {type: Boolean, required: true}
    
   });


var restaurantSchema = mongoose.Schema({

    name: {type:String , required : true},
    //location: {type: [Number], index: '2dsphere'},
    menu: [foodSchema],
    reviews: [reviewSchema],
    openingTimes : [openingSchema]
     
   });*/