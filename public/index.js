webpackJsonp([0],[
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! jquery */ 1);
	__webpack_require__(/*! angular */ 5);
	__webpack_require__(/*! moment */ 8);
	
	var app = __webpack_require__(/*! ./module */ 12);
	var home = __webpack_require__(/*! ./home */ 14);
	var entry = __webpack_require__(/*! ./entry */ 17);
	
	app.addModules([
	  'ui.router'
	]);
	
	app.TEMPLATES = {
	  HOME: __webpack_require__(/*! ./home/template.html */ 15),
	  ENTRY: __webpack_require__(/*! ./entry/template.html */ 18)
	};
	
	app.config(function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state('home', {
	      url: '/',
	      template: home.TEMPLATES.HOME,
	      controller: 'HomeController'
	    })
	    .state('entry', {
	      url: '/:entry',
	      template: entry.TEMPLATES.ENTRY,
	      controller: 'EntryController'
	    })
	    .state('commit', {
	      url: '/:entry/:commit',
	      template: entry.TEMPLATES.ENTRY,
	      controller: 'EntryController'
	    });
	
	  $urlRouterProvider.otherwise('/');
	
	});
	
	app.controller('NavigationController', function($scope) {
	  $scope.now = moment();
	});
	
	module.exports = app;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/*!*******************!*\
  !*** ./module.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(/*! angular */ 5);
	var _ = __webpack_require__(/*! lodash */ 13);
	
	var app = angular.module('app', ['ng', 'ngSanitize']);
	
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
/* 13 */,
/* 14 */
/*!***********************!*\
  !*** ./home/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! jquery */ 1);
	//require('angular');
	__webpack_require__(/*! moment */ 8);
	
	var app = __webpack_require__(/*! ../module */ 12);
	
	app.controller('HomeController', function($scope, $http) {
	  $scope.recentPosts = [];
	  $scope.journalPosts = [];
	  console.log('home controller');
	
	  var requestRecents = {
	  	method: 'GET',
	  	url: '/api/index',
	  	cache: true
	  };
	  var requestJournal = {
	  	method: 'GET',
	  	params: {
			entry: "apa", //TODO change to journal
	  		all: "true"
	  	},
	  	url: '/api/entry',
	  	cache: true
	  };
	
	  $http(requestRecents).then(function(response) {
	  	if(response.status === 200) {
	  		$scope.recentPosts = response.data.entry;
	  	}
	  });
	
	  $http(requestJournal).then(function(response) {
	  	console.log(response);
	  	if(response.status === 200) {
	  		$scope.journalPosts = response.data.commit;
	  	}
	  });
	
	});
	
	module.exports = app;

/***/ },
/* 15 */
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-3 col-md-6\">\n      <img class=\"svg-center the-koi\" src=\"" + __webpack_require__(/*! ./koi.svg */ 16) + "\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <p>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a vestibulum mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris tempor, lacus sed mollis vulputate, ipsum sem ultricies lectus, sit amet luctus nunc odio ac dui. Nulla et massa placerat, posuere felis in, fermentum ipsum. Pellentesque pretium fringilla elementum.\n          </p>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <h3 class=\"list-header\">\n            Recent Activity:\n          </h3>\n          <ul class=\"list-body\" ng-repeat=\"entry in recentPosts\">\n            <li class=\"clearfix\">\n              <a href=\"/#/{{entry.Slug}}\">{{entry.Name}}</a>\n              <time class=\"pull-right\" is=\"relative-time\" datetime=\"{{entry.LastUpdated.toString()}}\">April 1, 2014</time>\n            </li>\n          </ul>\n        </div>\n        <div class=\"col-md-6\">\n          <h3 class=\"list-header\">\n            Journal:\n          </h3>\n          <ul class=\"list-body\" ng-repeat=\"journal in journalPosts\">\n            <li class=\"clearfix\">\n              <a href=\"/#/{{journal.Slug}}/{{journal.CommitID}}\">{{journal.Title}}</a>\n              <time class=\"pull-right\" is=\"relative-time\" datetime=\"{{journal.CreateDate.toString()}}\">April 1, 2014</time>\n            </li>\n          </ul>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 16 */
/*!**********************!*\
  !*** ./home/koi.svg ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/koi.svg"

/***/ },
/* 17 */
/*!************************!*\
  !*** ./entry/index.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! jquery */ 1);
	//require('angular');
	__webpack_require__(/*! moment */ 8);
	
	var app = __webpack_require__(/*! ../module */ 12);
	
	app.controller('EntryController', function($scope, $http, $stateParams) {
	  $scope.entries = [];
	
	  var requestEntry = {
	  	method: 'GET',
	  	params: {
			  entry: $stateParams.entry
	  	},
	  	url: '/api/entry',
	  	cache: true
	  };
	  if($stateParams.commit) {
	    if($stateParams.commit != "all") {
	      requestEntry.params.commit = $stateParams.commit;
	    } else {
	      requestEntry.params.all = "true";
	    }
	  }
	  $http(requestEntry).then(function(response) {
	  	console.log(response);
	  	if(response.status === 200) {
	  		$scope.entries = response.data.commit;
	  	}
	  });
	
	});
	
	module.exports = app;

/***/ },
/* 18 */
/*!*****************************!*\
  !*** ./entry/template.html ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-3 col-md-6\">\n    \t\n      <div class=\"row\" ng-repeat=\"entry in entries\">\n        <div class=\"col-md-12\">\n          <h1>{{entry.Title}}</h1>\n          <p ng-bind-html=\"entry.CompiledContent\"></p>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map