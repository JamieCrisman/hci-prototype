'use strict';

//require('jquery');
//require('angular');
//require('moment');

var app = require('../module');
require('../services/foodService');

app.controller('CheckoutController', function($scope, foodService) {
  $scope.foodService = foodService;
  $scope.cardMonth = [
    {'month':'1'}, 
    {'month':'2'},
    {'month':'3'},
    {'month':'4'},
    {'month':'5'},
    {'month':'6'},
    {'month':'7'},
    {'month':'8'},
    {'month':'9'},
    {'month':'10'},
    {'month':'11'},
    {'month':'12'}
  ];
  $scope.cardYear = [
    {'year':'2015'}, 
    {'year':'2016'},
    {'year':'2017'},
    {'year':'2018'},
    {'year':'2019'},
    {'year':'2020'},
    {'year':'2021'},
    {'year':'2022'},
    {'year':'2023'}
  ];
});

module.exports = app;