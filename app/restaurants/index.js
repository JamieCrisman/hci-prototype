'use strict';

var app = require('../module');
require('../services/foodService');

app.controller('RestaurantsController', function($scope, foodService) {
	$scope.filterPrice = "1000";
	$scope.filterRating = "0";
	$scope.filterDistance = "1000";
	$scope.filterCuisine = "";
	$scope.filterOrderType = "either";
	$scope.filterDiscounts = false;
	$scope.sortMode = "+name";


	

	$scope.masterFilter = function(option) {
		var filtered = true;
		filtered &= (option.price <= parseInt($scope.filterPrice));
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