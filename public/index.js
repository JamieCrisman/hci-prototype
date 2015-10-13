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
	
	app.addModules([
	  'ui.router'
	]);
	
	app.TEMPLATES = {
	  HOME: __webpack_require__(/*! ./home/template.html */ 13),
	  RESTAURANTS: __webpack_require__(/*! ./restaurants/template.html */ 14)
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
	      controller: 'NavigationController'
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
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h2 class=\"text-center\">\n            <a ng-href=\"#\">Order, Eat</a>\n          </h2>\n          <p class=\"text-center\">\n            桃尻\n          </p>\n          <ul class=\"center-list\">\n            <li><a ng-href=\"#/restaurants\">Restaurants</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";

/***/ },
/* 14 */
/*!***********************************!*\
  !*** ./restaurants/template.html ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\tRestaurants!\n\t\t</div>\n\t</div>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map