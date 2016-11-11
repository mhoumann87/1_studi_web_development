//name our angular app
angular.module('firstApp', [])

.controller('mainController', function() {
    
    //bind this to the vm(view-model)
    var vm = this;

    //define our objects and variables on this
    //this lets them be arvaible for our views

    //define a basic variable 
    vm.message = 'Take a look at this';

    //define a list of items
    vm.computers = [
        { name: 'Macbook Pro', color: 'Silver', nerdness: 7 },
        { name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6 },
        { name: 'Chromebook', color: 'Black', nerdness: 5 }
    ];

});