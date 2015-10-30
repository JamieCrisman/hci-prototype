'use strict';

var app = require('./module');
var home = require('./home');
var entry = require('./test');
var restaurants = require('./restaurants');
var menu = require('./menu');
var cart = require('./cart');
var checkout = require('./checkout');
var feedback = require('./feedback');

require('./services/foodService');

app.addModules([
  'ui.router'
]);

app.TEMPLATES = {
  HOME: require('./home/template.html'),
  RESTAURANTS: require('./restaurants/template.html'),
  MENU: require('./menu/template.html'),
  CHECKOUT: require('./checkout/template.html'),
  CART: require('./cart/template.html'),
  FEEDBACK: require('./feedback/template.html')
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
      controller: 'RestaurantsController'
    })
    .state('menu', {
      url: '/menu',
      template: app.TEMPLATES.MENU,
      controller: 'MenuController'
    })
    .state('cart', {
      url: '/cart',
      template: app.TEMPLATES.CART,
      controller: 'CartController'
    })
    .state('checkout', {
      url: '/checkout',
      template: app.TEMPLATES.CHECKOUT,
      controller: 'CheckoutController'
    })
    .state('feedback', {
      url: '/feedback',
      template: app.TEMPLATES.FEEDBACK,
      controller: 'FeedbackController'
    });

  $urlRouterProvider.otherwise('/');

});

app.controller('NavigationController', function($scope, foodService) {
  $scope.now = moment();
  $scope.foodService = foodService;
});

module.exports = app;