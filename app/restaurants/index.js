'use strict';

var app = require('../module');

app.controller('RestaurantsController', function($scope) {
	$scope.filterPrice = "1000";
	$scope.filterRating = "0";
	$scope.filterDistance = "1000";
	$scope.filterCuisine = "";
	$scope.filterOrderType = "either";
	$scope.filterDiscounts = false;
	
	var randomNames = [
		"Bob's",
		"Greg's Great",
		"The Best",
		"Eat",
		"Lovely",
		"Tasty",
		"Korean",
		"Jon's",
		"Michael's",
		"Weird",
		"Yummy",
		"Uneaten",
		"Probably",
		"Fuzzy",
		"Delicious",
		"General Tso's",
		"Only"
	];

	$scope.categories = [
		'Pizza',
		'Italian',
		'Pho',
		'Ramen',
		'Sandwiches',
		'Thai',
		'Sushi',
		'Wings',
		'Chinese',
		'Dessert',
		'Seafood',
		'Fast food',
		'Burgers',
		'Mexican',
		'Japanese',
		'Steakhouse'
	];

	var _nameGenerate = function(categoryIndex) {
		
		var s = randomNames[Math.floor(Math.random() * randomNames.length)] + " " + $scope.categories[categoryIndex];
		
		return s;
	}

	var _orderType = function(index) {
		if(index % 3 == 0) {
			return 'either';
		}
		if (index % 3 == 1 ) {
			return 'carryout';
		}else {
			return 'delivery';
		}

	}

	var _generateRestaurants = function() {
		var restaurants = [];
		for( var i = 0; i < 100; i++ ) {
			var rest = {
				"name": _nameGenerate(i % $scope.categories.length),
				"rating": (i % 5) + 1,
				"distance": ((i * 0.3) % 15 ) + 0.1,
				"cuisine": $scope.categories[i % $scope.categories.length],
				"hasDiscounts": (i % 5 == 0),
				"price": 5 * ((i % 5 )+ 1),
				"orderType": _orderType(i)
			}
			restaurants.push(rest);
		}
		return restaurants;
	}

	$scope.masterFilter = function(option) {
		var filtered = true;
		filtered &= (option.price <= parseInt($scope.filterPrice));
		filtered &= (option.rating >= parseInt($scope.filterRating));
		filtered &= (option.distance <= parseInt($scope.filterDistance));
		filtered &= (option.orderType == $scope.filterOrderType || $scope.filterOrderType == 'either');
		filtered &= (option.cuisine == $scope.filterCuisine || $scope.filterCuisine == "");
		filtered &= (($scope.filterDiscounts == true && option.hasDiscounts == true) || $scope.filterDiscounts == false);
		return filtered;
	};

	$scope.range = function(i) {
		return _.range(i);
	}

	$scope.restaurants = _generateRestaurants();
});

module.exports = app;