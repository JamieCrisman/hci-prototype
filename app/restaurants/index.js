'use strict';

var app = require('../module');

app.controller('RestaurantsController', function($scope) {
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

	var categories = [
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
		
		var s = randomNames[Math.floor(Math.random() * randomNames.length)] + " " + categories[categoryIndex];
		
		return s;
	}

	var _generateRestaurants = function() {
		var restaurants = [];
		for( var i = 0; i < 300; i++ ) {
			var rest = {
				"name": _nameGenerate(i % categories.length),
				"rating": (i % 5) + 1,
				"distance": ((i * 0.1) % 5 ) + 0.1,
				"category": categories[i % categories.length],
				"hasSpecials": (i % 3 == 0),
				"price": 5 * ((i % 6 )+ 1)
			}
			restaurants.push(rest);
		}
		return restaurants;
	}

	$scope.restaurants = _generateRestaurants();
});

module.exports = app;