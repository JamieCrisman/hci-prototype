'use strict';

var app = require('./module');
var home = require('./home');
var entry = require('./test');

app.addModules([
  'ui.router'
]);

app.TEMPLATES = {
  HOME: require('./home/template.html'),
  RESTAURANTS: require('./restaurants/template.html')
};

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      template: app.TEMPLATES.HOME,
      controller: 'HomeController'
    })
    .state('restaurants', {
      url: '/restaurants',
      template: app.TEMPLATES.RESTAURANTS,
      controller: 'NavigationController'
    });

  $urlRouterProvider.otherwise('/');

});

app.controller('NavigationController', function($scope) {
  $scope.now = moment();
});

module.exports = app;