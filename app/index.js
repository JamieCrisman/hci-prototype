'use strict';

var app = require('./module');
var home = require('./home');
var entry = require('./entry');
var atlas = require('./atlas');

app.addModules([
  'ui.router'
]);

app.TEMPLATES = {
  HOME: require('./home/template.html'),
  ENTRY: require('./entry/template.html'),
  ATLAS: require('./atlas/template.html')
};

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      template: home.TEMPLATES.HOME,
      controller: 'HomeController'
    })
    .state('atlas', {
      url: '/atlas',
      template: atlas.TEMPLATES.ATLAS,
      controller: 'AtlasController'
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