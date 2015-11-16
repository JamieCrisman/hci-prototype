'use strict';

var app = require('../module');
require('../services/foodService');

app.controller('HomeController', function($scope, foodService, $state) {
  $scope.foodService = foodService;
  $scope.$state = $state;
});

module.exports = app;