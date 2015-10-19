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
	var menu = __webpack_require__(/*! ./menu */ 14);
	var cart = __webpack_require__(/*! ./cart */ 15);
	var checkout = __webpack_require__(/*! ./checkout */ 16);
	var feedback = __webpack_require__(/*! ./feedback */ 17);
	
	app.addModules([
	  'ui.router'
	]);
	
	app.TEMPLATES = {
	  HOME: __webpack_require__(/*! ./home/template.html */ 18),
	  RESTAURANTS: __webpack_require__(/*! ./restaurants/template.html */ 19),
	  MENU: __webpack_require__(/*! ./menu/template.html */ 20),
	  CHECKOUT: __webpack_require__(/*! ./checkout/template.html */ 21),
	  CART: __webpack_require__(/*! ./cart/template.html */ 22),
	  FEEDBACK: __webpack_require__(/*! ./feedback/template.html */ 23)
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
	    })
	    .state('menu', {
	      url: '/menu',
	      template: app.TEMPLATES.MENU,
	      controller: 'MenuController'
	    })
	    .state('cart', {
	      url: '/cart',
	      template: app.TEMPLATES.CART,
	      controller: 'CartController'
	    })
	    .state('checkout', {
	      url: '/checkout',
	      template: app.TEMPLATES.CHECKOUT,
	      controller: 'CheckoutController'
	    })
	    .state('feedback', {
	      url: '/feedback',
	      template: app.TEMPLATES.FEEDBACK,
	      controller: 'FeedbackController'
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

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('RestaurantsController', function($scope) {
		$scope.filterPrice = "1000";
		$scope.filterRating = "0";
		$scope.filterDistance = "1000";
		$scope.filterCuisine = "";
		$scope.filterOrderType = "either";
		$scope.filterDiscounts = false;
		$scope.sortMode = "+name";
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! lodash */ 9)))

/***/ },
/* 14 */
/*!***********************!*\
  !*** ./menu/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//require('jquery');
	//require('angular');
	//require('moment');
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('MenuController', function($scope) {
	
	});
	
	module.exports = app;

/***/ },
/* 15 */
/*!***********************!*\
  !*** ./cart/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//require('jquery');
	//require('angular');
	//require('moment');
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('CartController', function($scope) {
	
	});
	
	module.exports = app;

/***/ },
/* 16 */
/*!***************************!*\
  !*** ./checkout/index.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//require('jquery');
	//require('angular');
	//require('moment');
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('CheckoutController', function($scope) {
	
	});
	
	module.exports = app;

/***/ },
/* 17 */
/*!***************************!*\
  !*** ./feedback/index.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//require('jquery');
	//require('angular');
	//require('moment');
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('FeedbackController', function($scope) {
	
	});
	
	module.exports = app;

/***/ },
/* 18 */
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row home-menu\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Enter Your Address\">\n            <span class=\"input-group-btn\">\n              <a href=\"#/restaurants\" class=\"btn btn-primary\" type=\"button\">Submit</a>\n            </span>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 19 */
/*!***********************************!*\
  !*** ./restaurants/template.html ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-offset-3 col-md-6\">\n\t\t\t<h2>\n\t\t\t\tRestaurants\n\t\t\t</h2>\n\t\t</div>\n\t</div>\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <div class=\"form-group\">\n        <label>Cuisine</label>\n        <select ng-model=\"filterCuisine\">\n          <option value=\"\">Any</option>\n          <option ng-repeat=\"option in categories\" value=\"{{option}}\">{{option}}</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label>Order Type</label>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"filterOrderType\" value=\"either\" name=\"orderType\" id=\"option3\" autocomplete=\"off\"> Either\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"filterOrderType\" value=\"delivery\" name=\"orderType\" id=\"option1\" autocomplete=\"off\" default> Delivery\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"filterOrderType\" value=\"carryout\" name=\"orderType\" id=\"option2\" autocomplete=\"off\"> Carry-out\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label>Sort By</label>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"+name\" name=\"sortMode\" id=\"option1\" autocomplete=\"off\" default> Name\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"-rating\" name=\"sortMode\" id=\"option2\" autocomplete=\"off\"> Rating\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"+distance\" name=\"sortMode\" id=\"option3\" autocomplete=\"off\"> Distance\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"+price\" name=\"sortMode\" id=\"option3\" autocomplete=\"off\"> Price\n          </label>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Rating</label>\n        <select ng-model=\"filterRating\">\n          <option value=\"0\">Any</option>\n          <option value=\"2\">2 Star</option>\n          <option value=\"3\">3 Star</option>\n          <option value=\"4\">4 Star</option>\n          <option value=\"5\">5 Star</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label>Price</label>\n        <select ng-model=\"filterPrice\">\n          <option value=\"1000\">Any</option>\n          <option value=\"5\">$</option>\n          <option value=\"10\">$$</option>\n          <option value=\"15\">$$$</option>\n          <option value=\"20\">$$$$</option>\n          <option value=\"25\">$$$$$</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label>Distance</label>\n        <select ng-model=\"filterDistance\">\n          <option value=\"1000\">Any</option>\n          <option value=\"1\">Walking distance</option>\n          <option value=\"3\">3 miles</option>\n          <option value=\"5\">5 miles</option>\n          <option value=\"10\">Driving distance</option>\n          <option value=\"15\">Road trip</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Has Discounts\n          <input type=\"checkbox\" ng-model=\"filterDiscounts\">\n        </label>\n      </div>\n\n    </div>\n  \t<div class=\"col-md-6\">\n      <div class=\"row restaurant-row\" ng-repeat=\"restaurant in restaurants | filter:masterFilter | orderBy:sortMode\">\n    \t\t<div class=\"col-md-4\">\n    \t\t\t<div>\n            {{restaurant.name}}\n          </div>\n          <div ng-if=\"filterCuisine == ''\" class=\"restaurantCuisine\">\n            <small>{{restaurant.cuisine}}</small>\n          </div>\n          <div class=\"restaurant-stars\">\n            <span ng-repeat=\"i in range(5)\">\n              <i class=\"glyphicon\"\n                ng-class=\"{'glyphicon-star': $index < restaurant.rating, 'glyphicon-star-empty': $index >= restaurant.rating}\"\n              ></i>\n            </span>\n          </div>\n    \t\t</div>\n    \t\t<div class=\"col-md-2\">\n          {{restaurant.distance | number:1}} mi\n          <div class=\"restaurant-price\">\n            <span ng-repeat=\"i in range((restaurant.price-1)/5)\">\n              $\n            </span>\n          </div>\n    \t\t</div>\n        <div class=\"col-md-4 restaurant-notices\">\n          <div ng-if=\"restaurant.hasDiscounts\">\n            <i class=\"glyphicon glyphicon-tag\"></i> Discounts available\n          </div>\n          <div ng-if=\"filterOrderType == 'either' && restaurant.orderType != 'either'\">\n            <em>{{restaurant.orderType}} only</em>\n          </div>\n        </div>\n        <div class=\"col-md-1\">\n          <a href=\"#/menu\" class=\"btn btn-primary\">Select</a>\n        </div>\n      </div>\n    </div>\n\t</div>\n</div>";

/***/ },
/* 20 */
/*!****************************!*\
  !*** ./menu/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h1>Menu items</h1>\n          <a href=\"#/restaurants\" class=\"btn btn-default\">Restaurants</a>\n          <a href=\"#/cart\" class=\"btn btn-primary\"><i class=\"glyphicon glyphicon-shopping-cart\"></i> Cart</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 21 */
/*!********************************!*\
  !*** ./checkout/template.html ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h1>Checkout</h1>\n          <a href=\"#/cart\" class=\"btn btn-default\">Cart</a>\n          <a href=\"#/feedback\" class=\"btn btn-primary\">Feedback</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 22 */
/*!****************************!*\
  !*** ./cart/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h1>Shopping cart</h1>\n          <a href=\"#/menu\" class=\"btn btn-default\">Menu</a>\n          <a href=\"#/checkout\" class=\"btn btn-primary\">Checkout</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 23 */
/*!********************************!*\
  !*** ./feedback/template.html ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h1>Feedback</h1>\n          <a href=\"#/\" class=\"btn btn-primary\">Home</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map