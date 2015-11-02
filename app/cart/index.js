'use strict';

//require('jquery');
//require('angular');
//require('moment');

var app = require('../module');
require('../services/foodService');

app.controller('CartController', function($scope, foodService) {
  $scope.foodService = foodService;
});

module.exports = app;