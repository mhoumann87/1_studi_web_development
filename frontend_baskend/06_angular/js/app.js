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

    //information that comes from our form
    vm.computerData = {};

    vm.addComputer = function() {
        vm.computers.push({
            name: vm.computerData.name,
            color: vm.computerData.color,
            nerdness: vm.computerData.nerdness
        });
        //after our computer has been added clear the form
        vm.computerData = {};
    };

});