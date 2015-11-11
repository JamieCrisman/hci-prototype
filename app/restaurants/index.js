'use strict';

var app = require('../module');
var _ = require('lodash');
require('../services/foodService');

app.controller('RestaurantsController', function($scope, foodService) {
	$scope.filterPriceMin = "";
	$scope.filterPriceMax = "";
	$scope.filterRating = "0";
	$scope.filterDistance = "1000";
	$scope.filterCuisine = "";
	$scope.filterOrderType = "either";
	$scope.filterDiscounts = false;
	$scope.sortMode = "+name";


	

	$scope.masterFilter = function(option) {
		var filtered = true;
		var max = (!_.isEmpty($scope.filterPriceMax))? parseInt($scope.filterPriceMax) : 1000;
		var min = (!_.isEmpty($scope.filterPriceMin))? parseInt($scope.filterPriceMin) : 0;
		filtered &= (option.price <= max && option.price >= min);
		filtered &= (option.rating >= parseInt($scope.filterRating));
		filtered &= (option.distance <= parseInt($scope.filterDistance));
		filtered &= (option.orderType == $scope.filterOrderType || $scope.filterOrderType == 'either' || option.orderType == 'either');
		filtered &= (option.cuisine == $scope.filterCuisine || $scope.filterCuisine == "");
		filtered &= (($scope.filterDiscounts == true && option.hasDiscounts == true) || $scope.filterDiscounts == false);
		return filtered;
	};

	$scope.range = function(i) {
		return _.range(i);
	}

	$scope.categories = foodService.categories;
	$scope.restaurants = foodService.restaurants;
	$scope.foodService = foodService;
});

module.exports = app;