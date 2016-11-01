var Restaurant = require('../models/restaurant');

module.exports = function(apiRouter){
    
    // RESTAURANT ROUTES
    apiRouter.route('/restaurant')

	
	.post(function(req, res) {
		
		var restaurant = new Restaurant();		// create a new instance of the Restaurant model
		restaurant.name = req.body.name;  // set the restaurant name (comes from the request)
		restaurant.address = req.body.address;  // set the restaurant zipcode (comes from the request)
		restaurant.zipcode = req.body.zipcode;  // set the  (comes from the request)
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.phone = req.body.phone;
        restaurant.email = req.body.email;
        restaurant.foodType = req.body.foodType;

		restaurant.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000) 
					return res.json({ success: false, message: 'A restaurant with that detail already exists. '});
				else 
					return res.send(err);
			}

			// return a message
			res.json({ message: 'Restaurant created!' });
		});

	})

	// get all the restaurants (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {
		Restaurant.find(function(err, restaurants) {
			if (err) return res.send(err);

			// return the restaurants
			res.json(restaurants);
		});
	});

// on routes that end in /restaurants/:restaurants_id
// ----------------------------------------------------
apiRouter.route('/restaurant/:restaurant_id')

	// get the restaurant with that id
	.get(function(req, res) {
		Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
			if (err) return res.send(err);

			
			res.json(restaurant);
		});
	})

	// update the restaurant with this id
	.put(function(req, res) {
		Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {

			if (err) return res.send(err);

			// set the new restaurant information if it exists in the request
			if (req.body.name) restaurant.name = req.body.name;
			if (req.body.address) restaurant.address = req.body.address;
			if (req.body.zipcode) restaurant.zipcode = req.body.zipcode;
            if (req.body.city) restaurant.city = req.body.city;
            if (req.body.country) restaurant.country = req.body.country;
            if (req.body.phone) restaurant.phone = req.body.phone;
            if (req.body.email) restaurant.email = req.body.email;
            if (req.body.foodType) restaurant.foodType = req.body.foodType;
            

			// save the restaurant
			Restaurant.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json({ message: 'Restaurant updated!' });
			});

		});
	})

	// delete the restaurant with this id
	.delete(function(req, res) {
		Restaurant.remove({
			_id: req.params.restaurant_id
		}, function(err, restaurant) {
			if (err) return res.send(err);

			res.json({ message: 'Restaurant Successfully deleted' });
		});
	});
}