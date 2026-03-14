
function isActive() {
    return true;
}

module.exports = {
    isActive
};
"use strict";

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })  
        .when('/about', {
            templateUrl: 'about.html',
            controller: 'AboutController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

app.controller('HomeController', function ($scope) {
    $scope.message = 'Welcome to the Home Page!';
});
  return false;
}























module.exports = {
  isActive
};
