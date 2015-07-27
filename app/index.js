'use strict';

require('jquery');
require('angular');
require('moment');

var app = require('./module');
var home = require('./home');

app.addModules([
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      template: home.TEMPLATES.HOME,
      controller: 'HomeController'
    });

  $urlRouterProvider.otherwise('/');

});

app.controller('NavigationController', function($scope) {
  $scope.now = moment();
});

module.exports = app;