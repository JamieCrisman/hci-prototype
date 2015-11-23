'use strict';

//require('jquery');
//require('angular');
//require('moment');

var app = require('../module');
require('../services/foodService');
var _ = require('lodash');

app.controller('FeedbackController', function($scope, foodService) {
  $scope.foodService = foodService;
});

module.exports = app;