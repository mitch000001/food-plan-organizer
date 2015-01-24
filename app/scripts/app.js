'use strict';

/**
 * @ngdoc overview
 * @name foodPlanOrganizerApp
 * @description
 * # foodPlanOrganizerApp
 *
 * Main module of the application.
 */
angular
.module('foodPlanOrganizerApp', [
  'ngAnimate',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/calendar.html',
    controller: 'CalendarCtrl'
  })
  .when('/recipes', {
    templateUrl: 'views/recipes.html',
    controller: 'RecipesCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});