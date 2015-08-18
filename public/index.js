webpackJsonp([0],[
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ./module */ 1);
	var home = __webpack_require__(/*! ./home */ 11);
	var entry = __webpack_require__(/*! ./entry */ 12);
	var atlas = __webpack_require__(/*! ./atlas */ 13);
	
	app.addModules([
	  'ui.router'
	]);
	
	app.TEMPLATES = {
	  HOME: __webpack_require__(/*! ./home/template.html */ 14),
	  ENTRY: __webpack_require__(/*! ./entry/template.html */ 16),
	  ATLAS: __webpack_require__(/*! ./atlas/template.html */ 17)
	};
	
	app.config(function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state('home', {
	      url: '/',
	      template: home.TEMPLATES.HOME,
	      controller: 'HomeController'
	    })
	    .state('atlas', {
	      url: '/atlas',
	      template: atlas.TEMPLATES.ATLAS,
	      controller: 'AtlasController'
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
/* 1 */
/*!*******************!*\
  !*** ./module.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(/*! angular */ 2);
	var _ = __webpack_require__(/*! lodash */ 9);
	
	var app = angular.module('app', ['ng', 'ngSanitize', 'angular.filter']);
	
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
	
	app.controller('HomeController', function($scope, $http) {
	  $scope.recentPosts = [];
	  $scope.journalPosts = [];
	  //console.log('home controller');
	
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
	  		$scope.recentPosts = response.data.data.entries;
	  	}
	  });
	
	  $http(requestJournal).then(function(response) {
	  	//console.log(response);
	  	if(response.status === 200) {
	  		$scope.journalPosts = response.data.data.commits;
	      //console.log($scope.journalPosts)
	  	}
	  });
	
	});
	
	module.exports = app;

/***/ },
/* 12 */
/*!************************!*\
  !*** ./entry/index.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('EntryController', function($scope, $http, $stateParams) {
	  $scope.entries = [];
	  $scope.entryCount = 0;
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
	      $scope.entryCount = response.data.data.count;
	  		$scope.entries = response.data.data.commits;
	  	}
	  });
	
	});
	
	module.exports = app;

/***/ },
/* 13 */
/*!************************!*\
  !*** ./atlas/index.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = __webpack_require__(/*! ../module */ 1);
	
	app.controller('AtlasController', function($scope, $http, $stateParams) {
	  $scope.entries = [];
	  $scope.search = '';
	  var requestEntry = {
	  	method: 'GET',
	  	params: {
			  all: true
	  	},
	  	url: '/api/index',
	  	cache: true
	  };
	  $http(requestEntry).then(function(response) {
	  	if(response.status === 200) {
	  		$scope.entries = response.data.data.entries;
	  	}
	  });
	
	});
	
	module.exports = app;

/***/ },
/* 14 */
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-offset-2 col-md-8\">\n      <img class=\"svg-center the-koi\" src=\"" + __webpack_require__(/*! ./koi.svg */ 15) + "\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <p>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a vestibulum mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris tempor, lacus sed mollis vulputate, ipsum sem ultricies lectus, sit amet luctus nunc odio ac dui. Nulla et massa placerat, posuere felis in, fermentum ipsum. Pellentesque pretium fringilla elementum.\n          </p>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6 clearfix\">\n          <h3 class=\"list-header\">\n            Recent Activity:\n          </h3>\n          <ul class=\"list-body\" ng-repeat=\"entry in recentPosts\">\n            <li class=\"clearfix\">\n              <a href=\"/#/{{entry.slug}}\">{{entry.name}}</a>\n              <time class=\"pull-right\" is=\"relative-time\" datetime=\"{{entry.lastUpdated.toString()}}\">April 1, 2014</time>\n            </li>\n          </ul>\n          <div class=\"pull-right\">\n            <a href=\"/#/atlas\">Atlas</a>\n          </div>\n        </div>\n        <div class=\"col-md-6 clearfix\">\n          <h3 class=\"list-header\">\n            Journal:\n          </h3>\n          <ul class=\"list-body\" ng-repeat=\"journal in journalPosts\">\n            <li class=\"clearfix\">\n              <a href=\"/#/{{journal.slug}}/{{journal.commitId}}\">{{journal.title}}</a>\n              <time class=\"pull-right\" is=\"relative-time\" datetime=\"{{journal.createDate.toString()}}\">April 1, 2014</time>\n            </li>\n          </ul>\n          <div class=\"pull-right\">\n            <a href=\"/#/journal/all\">View More</a>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>";

/***/ },
/* 15 */
/*!**********************!*\
  !*** ./home/koi.svg ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/koi.svg"

/***/ },
/* 16 */
/*!*****************************!*\
  !*** ./entry/template.html ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\" ng-repeat=\"entry in entries\">\n    <div class=\"col-md-2\">\n      <div ng-if=\"entries.length > 1\" class=\"commit-text\">\n        <a href=\"/#/{{entry.slug}}/{{entry.commitId}}\">{{entry.commitId}}</a>\n      </div>\n      <div ng-if=\"entries.length == 1 && entryCount > 1\" class=\"commit-text\">\n        <a href=\"/#/{{entry.slug}}/all\">All Commits</a>\n      </div>\n    </div>\n    <div class=\"col-md-8\">\n      <h1>{{entry.title}}</h1>\n      <p ng-bind-html=\"entry.compiledContent\"></p>\n    </div>\n  </div>\n</div>";

/***/ },
/* 17 */
/*!*****************************!*\
  !*** ./atlas/template.html ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n      <p class=\"col-md-12 atlas-description\">\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a vestibulum mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris tempor, lacus sed mollis vulputate, ipsum sem ultricies lectus, sit amet luctus nunc odio ac dui. Nulla et massa placerat, posuere felis in, fermentum ipsum. Pellentesque pretium fringilla elementum.\n      </p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n      <form class=\"form\">\n        <div class=\"form-group col-md-12\">\n          <label class=\"sr-only\" for=\"searchEntries\">Search</label>\n          <input type=\"text\" class=\"form-control col-md-12\" ng-model=\"search\" id=\"searchEntries\" placeholder=\"Search\">\n        </div>\n      </form>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n      <div class=\"col-md-6\" ng-repeat=\"entry in entries | fuzzyBy: 'name': search\">\n        <a href=\"/#/{{entry.slug}}\">{{entry.name}}</a>\n      </div>\n    </div>\n  </div>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map