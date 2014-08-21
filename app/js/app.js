'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/list.html',
      controller: 'ListController'
    });
    $routeProvider.when('/add', {
      templateUrl: 'partials/add.html',
      controller: 'AddController'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
}]);
