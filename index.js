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

/***/ },
/* 14 */
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h2 class=\"text-center\">\n            <a ng-href=\"#\">Order, Eat</a>\n          </h2>\n          <p class=\"text-center\">\n            桃尻\n          </p>\n          <ul class=\"center-list\">\n            <li><a ng-href=\"#/restaurants\">Restaurants</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";

/***/ },
/* 15 */
/*!***********************************!*\
  !*** ./restaurants/template.html ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row\" ng-repeat=\"restaurant in restaurants\">\n\t\t<div class=\"col-md-4\">\n\t\t\t{{restaurant.name}}\n\t\t</div>\n\t\t<div class=\"col-md-1\">\n\t\t\t{{restaurant.rating}} star\n\t\t</div>\n\t\t<div class=\"col-md-2\">\n\t\t\t{{restaurant.distance | number:1}} miles\n\t\t</div>\n\t\t<div class=\"col-md-1\">\n\t\t\t~${{restaurant.price}}\n\t\t</div>\n\t\t<div class=\"col-md-2\">\n\t\t\t{{restaurant.category}}\n\t\t</div>\n\t\t<div class=\"col-md-2\">\n\t\t\t<span ng-if=\"restaurant.hasSpecials\">specials!</span>\n\t\t\t<span ng-if=\"!restaurant.hasSpecials\">no specials :C</span>\n\t\t</div>\n\t</div>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map