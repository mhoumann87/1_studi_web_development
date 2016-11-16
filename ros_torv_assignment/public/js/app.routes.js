// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/pages/forside.html',
            controller  : 'homeController',
            controllerAs: 'forside'
        })

        // route for the about page
        .when('/ugens_tilbud', {
            templateUrl : 'views/pages/ugens_tilbud.html',
            controller  : 'aboutController',
            controllerAs: 'ugens_tilbud'
        })

        // route for the contact page
        .when('/butik', {
            templateUrl : 'views/pages/butik.html',
            controller  : 'contactController',
            controllerAs: 'butik'
        });

    $locationProvider.html5Mode(true);
});