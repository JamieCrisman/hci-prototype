webpackJsonp([0],[
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ./module */ 1);
	var home = __webpack_require__(/*! ./home */ 11);
	var entry = __webpack_require__(/*! ./test */ 12);
	var restaurants = __webpack_require__(/*! ./restaurants */ 13);
	
	app.addModules([
	  'ui.router'
	]);
	
	app.TEMPLATES = {
	  HOME: __webpack_require__(/*! ./home/template.html */ 14),
	  RESTAURANTS: __webpack_require__(/*! ./restaurants/template.html */ 15)
	};
	
	app.config(function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state('home', {
	      url: '/',
	      template: app.TEMPLATES.HOME,
	      controller: 'HomeController'
	    })
	    .state('restaurants', {
	      url: '/restaurants',
	      template: app.TEMPLATES.RESTAURANTS,
	      controller: 'RestaurantsController'
	    });
	
	  $urlRouterProvider.otherwise('/');
	
	});
	
	app.controller('NavigationController', function($scope) {
	  $scope.now = moment();
	});
	
	module.exports = app;

/***/ },
/* 1 */
/*!*******************!*\
  !*** ./module.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(/*! angular */ 2);
	var _ = __webpack_require__(/*! lodash */ 9);
	
	var app = angular.module('app', ['ng', 'ngSanitize', 'angular.filter', 'ngAnimate']);
	
	// Allow services, factories, etc. to add dependencies
	// asynchronously
	app.addModules = function(modules) {
	
	  if(!_.isArray(modules)) {
	    modules = [modules];
	  }
	
	  _.forEach(modules, function(module) {
	    var contains = _.contains(app.requires, module);
	    if(!contains) {
	      app.requires.push(module);
	    }
	  });
	
	};
	
	module.exports = app;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!***********************!*\
  !*** ./home/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//require('jquery');
	//require('angular');
	//require('moment');
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('HomeController', function($scope) {
	
	});
	
	module.exports = app;

/***/ },
/* 12 */
/*!***********************!*\
  !*** ./test/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('TestController', function($scope) {
	
	});
	
	module.exports = app;

/***/ },
/* 13 */
/*!******************************!*\
  !*** ./restaurants/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('RestaurantsController', function($scope) {
		$scope.filterPrice = "0";
		$scope.filterRating = "0";
		$scope.filterDistance = "1000";
		$scope.filterCuisine = "";
		$scope.filterOrderType = "delivery";
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
			for( var i = 0; i < 300; i++ ) {
				var rest = {
					"name": _nameGenerate(i % $scope.categories.length),
					"rating": (i % 5) + 1,
					"distance": ((i * 0.3) % 15 ) + 0.1,
					"cuisine": $scope.categories[i % $scope.categories.length],
					"hasDiscounts": (i % 5 == 0),
					"price": 5 * ((i % 6 )+ 1),
					"orderType": _orderType(i)
				}
				restaurants.push(rest);
			}
			return restaurants;
		}
	
		$scope.masterFilter = function(option) {
			var filtered = true;
			filtered &= (option.price > parseInt($scope.filterPrice));
			filtered &= (option.rating >= parseInt($scope.filterRating));
			filtered &= (option.distance <= parseInt($scope.filterDistance));
			filtered &= (option.orderType == $scope.filterOrderType || $scope.filterOrderType == 'either');
			filtered &= (option.cuisine == $scope.filterCuisine || $scope.filterCuisine == "");
			filtered &= (($scope.filterDiscounts == true && option.hasDiscounts == true) || $scope.filterDiscounts == false);
			return filtered;
		};
	
		$scope.restaurants = _generateRestaurants();
	});
	
	module.exports = app;

/***/ },
/* 14 */
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row home-menu\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Enter your zipcode\">\n            <span class=\"input-group-btn\">\n              <a href=\"#/restaurants\" class=\"btn btn-primary\" type=\"button\">Submit</a>\n            </span>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 15 */
/*!***********************************!*\
  !*** ./restaurants/template.html ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-offset-3 col-md-6\">\n\t\t\t<h2>\n\t\t\t\tRestaurants\n\t\t\t</h2>\n\t\t</div>\n\t\t<div class=\"row\">\n      <div class=\"col-md-6 col-md-offset-3\">\n        \n        <div class=\"form-group\">\n          <label>Order Type</label>\n          <div>\n            <label>\n              <input type=\"radio\" ng-model=\"filterOrderType\" value=\"delivery\" name=\"orderType\" id=\"option1\" autocomplete=\"off\" default> Delivery\n            </label>\n            <label>\n              <input type=\"radio\" ng-model=\"filterOrderType\" value=\"carryout\" name=\"orderType\" id=\"option2\" autocomplete=\"off\"> Carry-out\n            </label>\n            <label>\n              <input type=\"radio\" ng-model=\"filterOrderType\" value=\"either\" name=\"orderType\" id=\"option3\" autocomplete=\"off\"> Either\n            </label>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label>Rating</label>\n          <select ng-model=\"filterRating\">\n          \t<option value=\"0\">Any</option>\n          \t<option value=\"2\">2 Star</option>\n          \t<option value=\"3\">3 Star</option>\n          \t<option value=\"4\">4 Star</option>\n          \t<option value=\"5\">5 Star</option>\n          </select>\n        </div>\n        <div class=\"form-group\">\n          <label>Price</label>\n          <select ng-model=\"filterPrice\">\n          \t<option value=\"0\">Any</option>\n          \t<option value=\"5\">$</option>\n          \t<option value=\"10\">$$</option>\n          \t<option value=\"15\">$$$</option>\n          \t<option value=\"20\">$$$$</option>\n          \t<option value=\"25\">$$$$$</option>\n          </select>\n        </div>\n        <div class=\"form-group\">\n          <label>Distance</label>\n          <select ng-model=\"filterDistance\">\n          \t<option value=\"1000\">Any</option>\n          \t<option value=\"0.7\">Walking distance</option>\n          \t<option value=\"1\">1 mile</option>\n          \t<option value=\"5\">5 mile</option>\n          \t<option value=\"10\">Driving distance</option>\n          \t<option value=\"15\">Road trip</option>\n          </select>\n        </div>\n\n        <div class=\"form-group\">\n          <label>Cuisine</label>\n          <select ng-model=\"filterCuisine\">\n          \t<option value=\"\">Any</option>\n          \t<option ng-repeat=\"option in categories\" value=\"{{option}}\">{{option}}</option>\n          </select>\n        </div>\n\n        <div class=\"form-group\">\n          <label>Has Discounts\n          \t<input type=\"checkbox\" ng-model=\"filterDiscounts\">\n          </label>\n        </div>\n\n      </div>\n    </div>\n\t</div>\n\n\t<div class=\"row\" ng-repeat=\"restaurant in restaurants | filter:masterFilter\">\n\t\t<div class=\"col-md-4\">\n\t\t\t{{restaurant.name}}\n\t\t</div>\n\t\t<div class=\"col-md-1\">\n\t\t\t{{restaurant.rating}} star\n\t\t</div>\n\t\t<div class=\"col-md-2\">\n\t\t\t{{restaurant.distance | number:1}} miles\n\t\t</div>\n\t\t<div class=\"col-md-1\">\n\t\t\t~${{restaurant.price}}\n\t\t</div>\n\t\t<div class=\"col-md-1\">\n\t\t\t{{restaurant.category}}\n\t\t</div>\n\t\t<div class=\"col-md-1\">\n\t\t\t{{restaurant.orderType}}\n\t\t</div>\n\t\t<div class=\"col-md-2\">\n\t\t\t<span ng-if=\"restaurant.hasDiscounts\">specials!</span>\n\t\t\t<span ng-if=\"!restaurant.hasDiscounts\">no specials :C</span>\n\t\t</div>\n\t</div>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map