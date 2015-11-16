webpackJsonp([0],[
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ./module */ 1);
	var home = __webpack_require__(/*! ./home */ 11);
	var entry = __webpack_require__(/*! ./test */ 13);
	var restaurants = __webpack_require__(/*! ./restaurants */ 14);
	var menu = __webpack_require__(/*! ./menu */ 15);
	var cart = __webpack_require__(/*! ./cart */ 16);
	var checkout = __webpack_require__(/*! ./checkout */ 17);
	var feedback = __webpack_require__(/*! ./feedback */ 18);
	
	__webpack_require__(/*! ./services/foodService */ 12);
	
	app.addModules([
	  'ui.router'
	]);
	
	app.TEMPLATES = {
	  HOME: __webpack_require__(/*! ./home/template.html */ 19),
	  RESTAURANTS: __webpack_require__(/*! ./restaurants/template.html */ 20),
	  MENU: __webpack_require__(/*! ./menu/template.html */ 21),
	  CHECKOUT: __webpack_require__(/*! ./checkout/template.html */ 22),
	  CART: __webpack_require__(/*! ./cart/template.html */ 23),
	  FEEDBACK: __webpack_require__(/*! ./feedback/template.html */ 24)
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
	
	app.controller('NavigationController', function($scope, foodService) {
	  $scope.now = moment();
	  $scope.foodService = foodService;
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
	
	var app = __webpack_require__(/*! ../module */ 1);
	__webpack_require__(/*! ../services/foodService */ 12);
	
	app.controller('HomeController', function($scope, foodService, $state) {
	  $scope.foodService = foodService;
	  $scope.$state = $state;
	});
	
	module.exports = app;

/***/ },
/* 12 */
/*!*********************************!*\
  !*** ./services/foodService.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';
	
	__webpack_require__(/*! jquery */ 5);
	__webpack_require__(/*! angular */ 2);
	__webpack_require__(/*! lodash */ 9);
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.service('foodService', function($filter) {
	
	  this.customerAddress = "";
	
	  this.selectedRestaurant;
	
	  this.cart = [];
	
	  this.addToCart = function(item) {
	    //ensures there's only one object of that menu item in the cart. if there is, increase its quantity
	    item.restaurant = this.selectedRestaurant;
	    item.restaurantIndex = this.selectedRestaurant.index; //keep track of both just because
	    var temp = angular.copy(_.findWhere(this.cart, {"name": item.name, "restaurantIndex": item.restaurantIndex}));
	    if(!!temp) {
	        _.remove(this.cart, temp);
	        item = angular.copy(temp);
	        item.quantity += 1;
	    } else {
	        item.quantity = 1;
	    }
	    this.cart.push(item);
	  }
	
	  this.removeItem = function(item) {
	    var temp = angular.copy(_.findWhere(this.cart, {"name": item.name, "restaurantIndex": item.restaurantIndex}));
	    if(!!temp) {
	        _.remove(this.cart, temp);
	        if(temp.quantity > 1) {
	            temp.quantity--;
	            this.cart.push(temp);
	        }
	    }
	  }
	
	  this.tip;
	
	  this.setTipPercent = function(percent) {
	    this.tip = 0;
	    if(percent == 0) {
	        return;
	    }
	    this.tip = Number($filter('number')(this.getTotal() * (percent / 100), 2));
	
	  }
	
	  this.getSubTotal = function() {
	    var t = 0;
	    _.each(this.cart, function(item) {
	        t += item.price * item.quantity;
	    });
	    return t;
	  }
	  this.getTax = function() {
	    var t = 0;
	    _.each(this.cart, function(item) {
	        t += item.price * item.quantity * 0.08;
	    });
	    return t;
	  }
	
	  this.getTotal = function() {
	    var t = (_.isNumber(this.tip))? this.tip : 0;
	    return this.getTax() + this.getSubTotal() + this.getFees() + Math.abs(t);
	  }
	
	  this.getFees = function() {
	    var self = this;
	    var t = 0;
	    var rest = [];
	    _.each(this.cart, function(item) {
	        if(!_.contains(rest, item.restaurantIndex) && item.restaurant.orderType != "carryout") {
	            rest.push(item.restaurantIndex);
	        }
	    });
	    _.each(rest, function(index) {
	        t += self.restaurants[index].deliveryFee;
	    });
	    return t;
	  }
	
	  this.getItemCount = function() {
	    var t = 0;
	    _.each(this.cart, function(item) {
	        t += item.quantity;
	    });
	    return t;
	  }
	
	
	  this.operatingHours = [
	    {
	      "day": "Sunday",
	      "hours": "10am-10pm"
	    },
	    {
	      "day": "Monday",
	      "hours": "10am-10pm"
	    },
	    {
	      "day": "Tuesday",
	      "hours": "10am-7pm"
	    },
	    {
	      "day": "Wednesday",
	      "hours": "10am-10pm"
	    },
	    {
	      "day": "Thursday",
	      "hours": "10am-10pm"
	    },
	    {
	      "day": "Friday",
	      "hours": "10am-12pm"
	    },
	    {
	      "day": "Saturday",
	      "hours": "10am-12pm"
	    }
	  ];
	
	  this.randomNames = [
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
	
	  this.categories = [
	    'Pizza',
	    'Italian',
	    'Pho',
	    'Ramen',
	    'Thai',
	    'Sushi',
	    'Chinese',
	    'Burgers',
	    'Mexican',
	    'Japanese'
	  ];
	  this.menus = {
	    "Burgers": [
	        {
	            "name": "Cheeseburger",
	            "price": 6.25,
	            "description": "All beef patty with American cheese."
	        },
	        {
	            "name": "Bacon Cheeseburger",
	            "price": 6.75,
	            "description": "The cheeseburger but with bacon."
	        },
	        {
	            "name": "Truffle Fries",
	            "price": 3.25,
	            "description": "French fries with truffle oil and parmesan."
	        }
	    ],
	    "Ramen": [
	        {
	            "name": "Tonkotsu Ramen",
	            "price": 8.25,
	            "description": "A creamy pork broth served with chashu pork, marinated, soft boiled egg, green onions, and wood ear mushrooms."
	        },
	        {
	            "name": "Shoyu Ramen",
	            "price": 8.25,
	            "description": "A soy sauce flavored chicken broth blend served with chashu pork, marinated, soft boiled egg, green onions, and wood ear mushrooms."
	        },
	        {
	            "name": "Miso Ramen",
	            "price": 8.25,
	            "description": "A miso flavored pork broth blend served with chashu pork, marinated, soft boiled egg, green onions, and wood ear mushrooms."
	        }
	    ],
	    "Chinese": [
	        {
	            "name": "Orange Chicken",
	            "price": 7.50,
	            "description": "Crispy chicken in a sweet and spicy orange sauce."
	        },
	        {
	            "name": "Fried Rice",
	            "price": 7.25,
	            "description": "White rice tossed in a wok with veggies and chicken."
	        },
	        {
	            "name": "Chow Mein",
	            "price": 7.25,
	            "description": "Noodles stir fried with veggies."
	        }
	    ],
	    "Sushi": [
	        {
	            "name": "California Roll",
	            "price": 6.75,
	            "description": "Crabmeat, cucumber, and avocado roll."
	        },
	        {
	            "name": "Sushi Omakase",
	            "price": 18.75,
	            "description": "Chef's handpicked fresh sushi and sashimi."
	        },
	        {
	            "name": "Sushi Burrito",
	            "price": 15.25,
	            "description": "Tuna, salmon, crabmeat, and avocado in a burrito sized sushi roll."
	        }
	    ],
	    "Mexican": [
	        {
	            "name": "Barbacoa Tacos",
	            "price": 4.75,
	            "description": "3 tacos with  slow cooked shredded beef, onions, and cilantro."
	        },
	        {
	            "name": "Al Pastor Tacos",
	            "price": 4.75,
	            "description": "3 tacos with pineapple marinated pork, onions, and cilantro."
	        },
	        {
	            "name": "Steak Quesadilla",
	            "price": 7.25,
	            "description": "A huge quesadilla stuffed with cheese, steak, tomatoes, avocado, and bell peppers. Served with queso, guacamole, and sour cream."
	        }
	    ],
	    "Thai": [
	        {
	            "name": "Pad Thai",
	            "price": 8.75,
	            "description": "Stir fried rice noodles with chicken, egg, scallion, bean sprouts, and peanuts in tangy tamarind sauce."
	        },
	        {
	            "name": "Pad See Ew",
	            "price": 8.75,
	            "description": "Stir fried rice noodles with chicken, egg, broccoli, garlic in a sweet soy sauce."
	        },
	        {
	            "name": "Pineapple Fried Rice",
	            "price": 7.75,
	            "description": "Rice stir fried with chicken, yellow curry, egg, pineapple, tomato, onion, and scallion."
	        }
	    ],
	    "Pizza": [
	        {
	            "name": "Cheese Pizza",
	            "price": 12.75,
	            "description": "The pepperoni pizza but without pepperoni."
	        },
	        {
	            "name": "Pepperoni Pizza",
	            "price": 14.75,
	            "description": "The cheese pizza but with pepperoni."
	        },
	        {
	            "name": "Garlic Breadsticks",
	            "price": 6.25,
	            "description": "It's like pizza crust with garlic butter."
	        }
	    ],
	    "Japanese": [
	        {
	            "name": "Tonkatsu Curry",
	            "price": 10.75,
	            "description": "Fried breaded pork cutlet with curry and rice."
	        },
	        {
	            "name": "Chicken Kaarage",
	            "price": 10.75,
	            "description": "Japanese fried chicken. Served with rice, miso soup, and salad."
	        },
	        {
	            "name": "Grilled Saba",
	            "price": 11.25,
	            "description": "Grilled mackerel. Served with rice, miso soup, and salad."
	        }
	    ],
	    "Pho": [
	        {
	            "name": "Pho Bo Vien",
	            "price": 9.25,
	            "description": "Beef broth, noodles, meatballs."
	        },
	        {
	            "name": "Pho Ga",
	            "price": 9.25,
	            "description": "Chicken broth, noodles, chicken."
	        },
	        {
	            "name": "Pho Tai",
	            "price": 9.25,
	            "description": "Beef broth, noodles, rare cooked beef."
	        }
	    ],
	    "Italian": [
	        {
	            "name": "Chicken Fettuccine Alfredo",
	            "price": 10.75,
	            "description": "Fettuccine tossed in parmesan and butter with chicken."
	        },
	        {
	            "name": "Chicken Parmigiana",
	            "price": 10.75,
	            "description": "Pasta with breaded chicken, red tomato sauce, parmesan cheese."
	        },
	        {
	            "name": "Carbonara",
	            "price": 11.25,
	            "description": "Spaghetti tossed in parmesan, eggs, pancetta, and black pepper."
	        }
	    ]
	  };
	
	  this._nameGenerate = function(categoryIndex) {
	    
	    var s = this.randomNames[Math.floor(Math.random() * this.randomNames.length)] + " " + this.categories[categoryIndex];
	    
	    return s;
	  }
	
	  this._orderType = function(index) {
	    if(index % 3 == 0) {
	      return 'either';
	    }
	    if (index % 3 == 1 ) {
	      return 'carryout';
	    }else {
	      return 'delivery';
	    }
	
	  }
	
	  this._generateRestaurants = function() {
	    var restaurants = [];
	    for( var i = 0; i < 100; i++ ) {
	      var rest = {
	        "index": i,
	        "name": this._nameGenerate(i % this.categories.length),
	        "rating": (i % 5) + 1,
	        "distance": ((i * 0.3) % 15 ) + 0.1,
	        "cuisine": this.categories[i % this.categories.length],
	        "hasDiscounts": (i % 5 == 0),
	        "price": 5 * ((i % 5 )+ 1),
	        "orderType": this._orderType(i),
	        "deliveryFee": 4.00,
	        "deliveryMinimum": 15.00,
	        "reviews": [{
	          "name": "John",
	          "text": "This is the absolute best " + this.categories[i % this.categories.length] + " in the area! 10/10" 
	        }]
	      }
	      restaurants.push(rest);
	    }
	    return restaurants;
	  }
	
	  this.restaurants = this._generateRestaurants();
	
	});
	
	module.exports = app;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! lodash */ 9)))

/***/ },
/* 13 */
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
/* 14 */
/*!******************************!*\
  !*** ./restaurants/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ../module */ 1);
	var _ = __webpack_require__(/*! lodash */ 9);
	__webpack_require__(/*! ../services/foodService */ 12);
	
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

/***/ },
/* 15 */
/*!***********************!*\
  !*** ./menu/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ../module */ 1);
	__webpack_require__(/*! ../services/foodService */ 12);
	
	app.controller('MenuController', function($scope, foodService) {
	  $scope.foodService = foodService;
	});
	
	module.exports = app;

/***/ },
/* 16 */
/*!***********************!*\
  !*** ./cart/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//require('jquery');
	//require('angular');
	//require('moment');
	
	var app = __webpack_require__(/*! ../module */ 1);
	__webpack_require__(/*! ../services/foodService */ 12);
	
	app.controller('CartController', function($scope, foodService, $state) {
	  $scope.foodService = foodService;
	  $scope.$state = $state;
	});
	
	module.exports = app;

/***/ },
/* 17 */
/*!***************************!*\
  !*** ./checkout/index.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//require('jquery');
	//require('angular');
	//require('moment');
	
	var app = __webpack_require__(/*! ../module */ 1);
	__webpack_require__(/*! ../services/foodService */ 12);
	
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

/***/ },
/* 18 */
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
/* 19 */
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row home-menu\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <form ng-submit=\"$state.go('restaurants')\">\n            <div class=\"input-group\">\n              <input type=\"text\" class=\"form-control\" ng-model=\"foodService.customerAddress\" placeholder=\"Street Address, City, State, Zip\" required>\n              <span class=\"input-group-btn\">\n                <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n              </span>\n            </div>\n          </form>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 20 */
/*!***********************************!*\
  !*** ./restaurants/template.html ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-offset-3 col-md-6\">\n\t\t\t<h2>\n\t\t\t\tRestaurants\n\t\t\t</h2>\n\t\t</div>\n\t</div>\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <div class=\"form-group\">\n        <label>Category</label>\n        <select ng-model=\"filterCuisine\">\n          <option value=\"\">Any</option>\n          <option ng-repeat=\"option in categories\" value=\"{{option}}\">{{option}}</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label>Order Type</label>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"filterOrderType\" value=\"either\" name=\"orderType\" id=\"option3\" autocomplete=\"off\"> Either\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"filterOrderType\" value=\"delivery\" name=\"orderType\" id=\"option1\" autocomplete=\"off\" default> Delivery\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"filterOrderType\" value=\"carryout\" name=\"orderType\" id=\"option2\" autocomplete=\"off\"> Carry-out\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label>Sort By</label>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"+name\" name=\"sortMode\" id=\"option1\" autocomplete=\"off\" default> Name\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"-rating\" name=\"sortMode\" id=\"option2\" autocomplete=\"off\"> Rating\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"+distance\" name=\"sortMode\" id=\"option3\" autocomplete=\"off\"> Distance\n          </label>\n        </div>\n        <div>\n          <label>\n            <input type=\"radio\" ng-model=\"sortMode\" value=\"+price\" name=\"sortMode\" id=\"option3\" autocomplete=\"off\"> Price\n          </label>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Rating</label>\n        <select ng-model=\"filterRating\">\n          <option value=\"0\">Any</option>\n          <option value=\"2\">2 Star or more</option>\n          <option value=\"3\">3 Star or more</option>\n          <option value=\"4\">4 Star or more</option>\n          <option value=\"5\">5 Star</option>\n        </select>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-xs-12\">\n          <label>Price range</label>\n        </div>\n        <div class=\"col-xs-5\">\n          <input type=\"text\" class=\"form-control\" ng-model=\"filterPriceMin\" ng-model-options=\"{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }\" placeholder=\"min. price\">\n        </div>\n        <div class=\"col-xs-5\">\n          <input type=\"text\" class=\"form-control col-xs-1\" ng-model=\"filterPriceMax\" ng-model-options=\"{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }\" placeholder=\"max price\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label>Distance</label>\n        <select ng-model=\"filterDistance\">\n          <option value=\"1000\">Any</option>\n          <option value=\"1\">Walking distance (1 mile)</option>\n          <option value=\"3\">3 miles</option>\n          <option value=\"5\">5 miles</option>\n          <option value=\"10\">10 miles</option>\n          <option value=\"15\">Road trip (15 miles)</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Has Discounts\n          <input type=\"checkbox\" ng-model=\"filterDiscounts\">\n        </label>\n      </div>\n\n    </div>\n  \t<div class=\"col-md-6\">\n      <div class=\"row\">\n        <div class=\"col-md-12\" ng-show=\"(restaurants | filter:masterFilter).length == 0\">\n          <h3>\n            Sorry, no restaurants fit your criteria\n          </h3>\n        </div>\n      </div>\n      <div class=\"row restaurant-row\" ng-repeat=\"restaurant in restaurants | filter:masterFilter | limitTo:30 | orderBy:sortMode\">\n    \t\t<div class=\"col-md-4\">\n    \t\t\t<div>\n            {{restaurant.name}}\n          </div>\n          <div ng-if=\"filterCuisine == ''\" class=\"restaurantCuisine\">\n            <small>{{restaurant.cuisine}}</small>\n          </div>\n          <div class=\"restaurant-stars\">\n            <span ng-repeat=\"i in range(5)\">\n              <i class=\"glyphicon\"\n                ng-class=\"{'glyphicon-star': $index < restaurant.rating, 'glyphicon-star-empty': $index >= restaurant.rating}\"\n              ></i>\n            </span>\n          </div>\n    \t\t</div>\n    \t\t<div class=\"col-md-2\">\n          {{restaurant.distance | number:1}} mi\n          <div class=\"restaurant-price\">\n            <span ng-repeat=\"i in range((restaurant.price-1)/5)\">\n              $\n            </span>\n          </div>\n    \t\t</div>\n        <div class=\"col-md-4 restaurant-notices\">\n          <div ng-if=\"restaurant.hasDiscounts\">\n            <span class=\"label label-success\"><i class=\"glyphicon glyphicon-tag\"></i> Discounts available</span>\n          </div>\n          <div ng-if=\"restaurant.orderType != 'either'\">\n            <span class=\"label label-default\">{{restaurant.orderType}}</span>\n          </div>\n          <div ng-if=\"restaurant.orderType == 'either'\">\n            <span class=\"label label-default\">carryout</span>\n            <span class=\"label label-default\">delivery</span>\n          </div>\n        </div>\n        <div class=\"col-md-1\">\n          <a href=\"#/menu\" ng-click=\"foodService.selectedRestaurant = restaurant\" class=\"btn btn-primary\">Select</a>\n        </div>\n      </div>\n    </div>\n\t</div>\n</div>";

/***/ },
/* 21 */
/*!****************************!*\
  !*** ./menu/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <a href=\"#/restaurants\" class=\"btn btn-default\">Restaurants</a>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <h2>Images</h2>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <a href=\"#\" class=\"thumbnail\">\n            <img src=\"http://placehold.it/120x120\">\n          </a>\n        </div>\n        <div class=\"col-md-6\">\n          <a href=\"#\" class=\"thumbnail\">\n            <img src=\"http://placehold.it/120x120\">\n          </a>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <a href=\"#\" class=\"thumbnail\">\n            <img src=\"http://placehold.it/120x120\">\n          </a>\n        </div>\n        <div class=\"col-md-6\">\n          <a href=\"#\" class=\"thumbnail\">\n            <img src=\"http://placehold.it/120x120\">\n          </a>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <a href=\"#\" class=\"thumbnail\">\n            <img src=\"http://placehold.it/120x120\">\n          </a>\n        </div>\n        <div class=\"col-md-6\">\n          <a href=\"#\" class=\"thumbnail\">\n            <img src=\"http://placehold.it/120x120\">\n          </a>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-6\">\n      <div class=\"clearfix\">\n      <h1 class=\"pull-left\">{{foodService.selectedRestaurant.name}}</h1>\n      </div>\n      <div class=\"row menu-row\" ng-repeat=\"item in foodService.menus[foodService.selectedRestaurant.cuisine]\">\n        <div class=\"col-md-4\">\n          <strong>{{item.name}}</strong>\n        </div>\n        <div class=\"col-md-6\">\n          {{item.description}}\n        </div>\n        <div class=\"col-md-2\">\n          <a class=\"btn btn-primary pull-right\" ng-click=\"foodService.addToCart(item)\">+{{item.price | currency}}</a>\n        </div>\n      </div>\n      <h2>\n        Reviews\n      </h2>\n      <div>\n        <div ng-repeat=\"review in foodService.selectedRestaurant.reviews\">\n          <strong>{{review.name}}:</strong> {{review.text}}\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-3\">\n      <h2>Information</h2>\n      <dl>\n        <dt>Cuisine</dt>\n        <dd>{{foodService.selectedRestaurant.cuisine}}</dd>\n        <dt>Rating</dt>\n        <dd>{{foodService.selectedRestaurant.rating}}/5</dd>\n        <dt ng-if=\"foodService.selectedRestaurant.orderType != 'carryout'\">Delivery Fee</dt>\n        <dd ng-if=\"foodService.selectedRestaurant.orderType != 'carryout'\">{{foodService.selectedRestaurant.deliveryFee | currency}}</dd>\n        <dt ng-if=\"foodService.selectedRestaurant.orderType != 'carryout'\">Delivery Minimum</dt>\n        <dd ng-if=\"foodService.selectedRestaurant.orderType != 'carryout'\">{{foodService.selectedRestaurant.deliveryMinimum | currency}}</dd>\n        <dt>Distance</dt>\n        <dd>{{foodService.selectedRestaurant.distance | number:2}} miles</dd>\n      </dl>\n    </div>\n  </div>\n</div>";

/***/ },
/* 22 */
/*!********************************!*\
  !*** ./checkout/template.html ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <a href=\"#/cart\" class=\"btn btn-default\">Cart</a>\n    </div>\n  </div>\n  <form ng-submit=\"completeOrder = true\">\n    <div class=\"row\">\n      <div class=\"col-md-6 col-md-offset-3 clearfix\">\n        <h1 class=\"pull-left\">Checkout</h1>\n        <a href=\"#/feedback\" class=\"btn btn-primary pull-right header-cart\">Feedback</a>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6 col-md-offset-3\">\n        <div ng-show=\"foodService.cart < 1\">\n          <h2>There's no items in your cart.</h2>\n          <p>\n            You should add to your cart! <a href=\"#/menu\" ng-show=\"foodService.selectedRestaurant\" class=\"btn btn-default\">{{foodService.selectedRestaurant.name}} Menu</a> <a href=\"#/restaurants\" class=\"btn btn-default\">View Restaurants</a>\n          </p>\n        </div>\n        <div ng-hide=\"foodService.cart < 1 || completeOrder == true\">\n            <div class=\"input-group col-md-6\">\n              <label for=\"userAddress\">Delivery Address</label>\n              <input type=\"text\" name=\"userAddress\" id=\"userAddress\" class=\"form-control\" ng-model=\"foodService.customerAddress\" placeholder=\"Street Address, City, State, Zip\" required>        \n            </div>\n\n            <div class=\"input-group col-md-6\">\n              <label for=\"phoneNumber\">Phone Number</label>\n              <input type=\"text\" name=\"phoneNumber\" id=\"phoneNumber\" class=\"form-control\" ng-model=\"foodService.customerPhone\" placeholder=\"(XXX) XXX XXXX\" required> \n            </div>\n\n            <div class=\"input-group col-md-6\">\n              <label for=\"emailAddress\">Email</label>\n              <input type=\"email\" name=\"emailAddress\" id=\"emailAddress\" class=\"form-control\" ng-model=\"foodService.customerEmail\" placeholder=\"example@email.com\" required>        \n            </div>\n\n            <h3>Payment Options</h3>\n            <a class=\"btn btn-default\" ng-click=\"usingOther = true; usingCard = false\">PayPal</a>\n            <a class=\"btn btn-default\" ng-click=\"usingOther = true; usingCard = false\">Amazon</a>\n            <a class=\"btn btn-default\" ng-click=\"usingOther = false; usingCard = true\">Card</a>\n\n            <div ng-if=\"usingCard\">\n              <div class=\"input-group col-md-6\">\n                <input type=\"text\" class=\"form-control\" ng-model=\"foodService.customerCardName\" placeholder=\"Name On Card\" required>\n              </div>\n              <div class=\"input-group col-md-6\">\n                <input type=\"text\" class=\"form-control\" ng-model=\"foodService.customerCard\" placeholder=\"Credit Card Number\" required>\n              </div>\n              <div class=\"col-md-12\">\n                <label> Expiration Month\n                  <select name=\"customerCardMonth\" ng-model=\"foodService.customerCardMonth\" ng-options=\"c.month for c in cardMonth\" required>\n                    <option value=\"\">--</option>\n                  </select>\n                </label>\n              </div>\n              <div class=\"col-md-12\">\n                <label> Expiration Year\n                  <select name=\"customerCardYear\" ng-model=\"foodService.customerCardYear\" ng-options=\"c.year for c in cardYear\" required>\n                    <option value=\"\">--</option>\n                  </select>\n                </label>\n              </div>\n              <div class=\"input-group col-md-3\">\n                <input type=\"text\" class=\"form-control\" ng-model=\"foodService.customerCardSecurity\" placeholder=\"Security Code\" required>\n              </div>\n              <label><input type=\"checkbox\" ng-model=\"differentBilling\"/> Billing address is different than delivery address</label>\n              <div class=\"input-group col-md-6\" ng-if=\"differentBilling\">\n                <input type=\"text\" class=\"form-control\" ng-model=\"foodService.customerBilling\" placeholder=\"Street Address, City, State, Zip\" required>\n              </div>\n              <div class=\"input-group col-md-6\">\n                <input type=\"submit\" class=\"btn btn-primary\" value=\"Confirm\"/>\n              </div>\n            </div>\n            <div ng-show=\"usingOther\">\n              <div class=\"input-group col-md-6\">\n                <input type=\"submit\" class=\"btn btn-primary\" value=\"Confirm\"/>\n              </div>\n            </div>\n\n        </div>\n        <div ng-show=\"completeOrder\">\n          <h2>Order has been submitted!</h2>\n        </div>\n      </div>\n      <div class=\"col-md-3\" ng-show=\"foodService.cart.length > 0 && completeOrder != true\">\n        <h2>Total: {{foodService.getTotal() | currency}}</h2>\n        <dl>\n          <dt>Tax</dt>\n          <dd>{{foodService.getTax() | currency}}</dd>\n          <dt>Delivery Fees</dt>\n          <dd>{{foodService.getFees() | currency}}</dd>\n          <dt>SubTotal</dt>\n          <dd>{{foodService.getSubTotal() | currency}}</dd>\n          <dt>Tip</dt>\n          <dd>\n            <div class=\"input-group\">\n              <label>\n                <input type=\"checkbox\"\n                  ng-model=\"foodService.cashTip\"\n                  ng-click=\"foodService.setTipPercent(0)\"\n                  ng-true-value=\"true\"\n                  ng-false-value=\"false\" />\n                  Cash Tip\n              </label>\n            </div>\n            <div ng-if=\"!foodService.cashTip\">\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">$</span>\n                <input type=\"number\" ng-model=\"foodService.tip\" step=\"any\" min=\"0\" placeholder=\"Ex. {{foodService.getTotal() * 0.15 | currency}}\" required>\n              </div>\n              <div class=\"form-group\">\n                <label>Quick Tip</label>\n                <a class=\"btn btn-primary\" ng-click=\"foodService.setTipPercent(15)\">\n                  15%\n                </a>\n                <a class=\"btn btn-primary\" ng-click=\"foodService.setTipPercent(20)\">\n                  20%\n                </a>\n                <a class=\"btn btn-primary\" ng-click=\"foodService.setTipPercent(25)\">\n                  25%\n                </a>\n              </div>\n            </div>\n          </dd>\n        </dl>\n      </div>\n    </div>\n  </form>\n</div>";

/***/ },
/* 23 */
/*!****************************!*\
  !*** ./cart/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <a href=\"#/menu\" class=\"btn btn-default\">Menu</a>\n    </div>\n  </div>\n  <form ng-submit=\"$state.go('checkout')\">\n    <div class=\"row\">\n      <div class=\"col-md-6 col-md-offset-3 clearfix\">\n        <h1 class=\"pull-left\">Shopping cart</h1>\n        <input type=\"submit\" value=\"Checkout\" class=\"btn btn-primary pull-right header-cart\" ng-hide=\"foodService.cart < 1\"/>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6 col-md-offset-3\">\n        <div ng-show=\"foodService.cart < 1\">\n          <h2>There's no items in your cart.</h2>\n          <p>\n            You should add to your cart! <a href=\"#/menu\" ng-show=\"foodService.selectedRestaurant\" class=\"btn btn-default\">{{foodService.selectedRestaurant.name}} Menu</a> <a href=\"#/restaurants\" class=\"btn btn-default\">View Restaurants</a>\n          </p>\n        </div>\n        <div ng-repeat=\"(key, value) in foodService.cart | groupBy: 'restaurantIndex'\">\n          <h3>{{foodService.restaurants[key].name}} <small><a href=\"#/menu\" ng-click=\"foodService.selectedRestaurant = foodService.restaurants[key]\">View Menu</a></small></h3>\n          <div ng-repeat=\"item in value | orderBy: '+name'\">\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                {{item.name}}\n              </div>\n              <div class=\"col-md-2\">\n                <strong>{{item.price | currency}}</strong>\n              </div>\n              <div class=\"col-md-4\">\n                <div class=\"input-group\">\n                  <a class=\"btn btn-default input-group-addon\" ng-click=\"foodService.removeItem(item)\" type=\"button\">\n                    <i class=\"glyphicon\" ng-class=\"{'glyphicon-minus': item.quantity > 1, 'glyphicon-trash': item.quantity == 1 || !item.quantity}\"></i>\n                  </a>\n                  <input type=\"number\" class=\"form-control\" ng-model=\"item.quantity\" ng-model-options=\"{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }\" min=\"1\" placeholder=\"quantity\" required>\n                  <a class=\"btn btn-default input-group-addon\" ng-click=\"item.quantity = item.quantity + 1\" type=\"button\">\n                    <i class=\"glyphicon glyphicon-plus\"></i>\n                  </a>\n                </div>\n              </div>\n            </div>\n            <div class=\"row menu-row\">\n              <div class=\"col-md-12\">\n                <textarea ng-bind=\"item.notes\" class=\"col-md-12\" placeholder=\"Notes for {{item.name}}\">\n                </textarea>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-3\" ng-show=\"foodService.cart.length > 0\">\n        <h2>Total: {{(foodService.getTotal() | currency) || \"???\"}}</h2>\n        <dl>\n          <dt>Tax</dt>\n          <dd>{{(foodService.getTax() | currency) || \"??\"}}</dd>\n          <dt>Delivery Fees</dt>\n          <dd>{{(foodService.getFees() | currency) || \"??\"}}</dd>\n          <dt>SubTotal</dt>\n          <dd>{{(foodService.getSubTotal() | currency) || \"??\" }}</dd>\n          <dt>Tip</dt>\n          <dd>\n            <div class=\"input-group\">\n              <label>\n                <input type=\"checkbox\"\n                  ng-model=\"foodService.cashTip\"\n                  ng-click=\"foodService.setTipPercent(0)\"\n                  ng-true-value=\"true\"\n                  ng-false-value=\"false\" />\n                  Cash Tip\n              </label>\n            </div>\n            <div ng-if=\"!foodService.cashTip\">\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">$</span>\n                <input type=\"number\" ng-model=\"foodService.tip\" step=\"any\" min=\"0\" placeholder=\"Ex. {{foodService.getTotal() * 0.15 | currency}}\" required>\n              </div>\n              <div class=\"form-group\">\n                <label>Quick Tip</label>\n                <a class=\"btn btn-primary\" ng-click=\"foodService.setTipPercent(15)\">\n                  15%\n                </a>\n                <a class=\"btn btn-primary\" ng-click=\"foodService.setTipPercent(20)\">\n                  20%\n                </a>\n                <a class=\"btn btn-primary\" ng-click=\"foodService.setTipPercent(25)\">\n                  25%\n                </a>\n              </div>\n            </div>\n          </dd>\n        </dl>\n      </div>\n    </div>\n  </form>\n</div>";

/***/ },
/* 24 */
/*!********************************!*\
  !*** ./feedback/template.html ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      \n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h1>Feedback</h1>\n          <a href=\"#/\" class=\"btn btn-primary\">Home</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map