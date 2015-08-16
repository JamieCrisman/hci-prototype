'use strict';

require('jquery');
require('angular');
require('moment');

var app = require('./module');
var home = require('./home');
var entry = require('./entry');

app.addModules([
  'ui.router'
]);

app.TEMPLATES = {
  HOME: require('./home/template.html'),
  ENTRY: require('./entry/template.html')
};

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      template: home.TEMPLATES.HOME,
      controller: 'HomeController'
    })
    .state('entry', {
      url: '/:entry',
      template: entry.TEMPLATES.ENTRY,
      controller: 'EntryController'
    })
    .state('commit', {
      url: '/:entry/:commit',
      template: entry.TEMPLATES.ENTRY,
      controller: 'EntryController'
    });

  $urlRouterProvider.otherwise('/');

});

app.controller('NavigationController', function($scope) {
  $scope.now = moment();
});

module.exports = app;