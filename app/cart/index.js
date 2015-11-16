'use strict';

//require('jquery');
//require('angular');
//require('moment');

var app = require('../module');
require('../services/foodService');

app.controller('CartController', function($scope, foodService, $state) {
  $scope.foodService = foodService;
  $scope.$state = $state;
});

module.exports = app;