'use strict';

var app = require('../module');
require('../services/foodService');

app.controller('MenuController', function($scope, foodService) {
  $scope.foodService = foodService;
});

module.exports = app;