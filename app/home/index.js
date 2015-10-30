'use strict';

var app = require('../module');
require('../services/foodService');

app.controller('HomeController', function($scope, foodService) {
  $scope.foodService = foodService;
});

module.exports = app;