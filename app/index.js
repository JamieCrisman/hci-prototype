'use strict';

require('jquery');
require('angular');

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

module.exports = app;