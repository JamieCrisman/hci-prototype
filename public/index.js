webpackJsonp([0],[
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! jquery */ 1);
	__webpack_require__(/*! angular */ 5);
	
	var app = __webpack_require__(/*! ./module */ 8);
	var home = __webpack_require__(/*! ./home */ 11);
	
	
	app.addModules([
	  'ui.router'
	]);
	
	app.config(function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state('home', {
	      url: '/',
	      template: home.TEMPLATES.HOME,
	      controller: 'HomeController'
	    });
	
	  $urlRouterProvider.otherwise('/');
	
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
/* 8 */
/*!*******************!*\
  !*** ./module.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(/*! angular */ 5);
	var _ = __webpack_require__(/*! lodash */ 9);
	
	var app = angular.module('app', ['ng']);
	
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
/* 9 */,
/* 10 */,
/* 11 */
/*!***********************!*\
  !*** ./home/index.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! jquery */ 1);
	__webpack_require__(/*! angular */ 5);
	
	var app = __webpack_require__(/*! ../module */ 8);
	
	app.controller('HomeController', function($scope) {
	
	});
	
	app.TEMPLATES = {
	  HOME: __webpack_require__(/*! ./template.html */ 12)
	};
	
	module.exports = app;

/***/ },
/* 12 */
/*!****************************!*\
  !*** ./home/template.html ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n  <h1>boop</h1>\n  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus lacus turpis, vel molestie erat mollis nec. Phasellus nisl urna, gravida id magna ut, eleifend sollicitudin arcu. Sed porttitor magna sapien, placerat cursus metus luctus vitae. Nullam mollis elit a metus ultrices suscipit. Vivamus vitae cursus purus. Etiam sed urna nulla. Fusce iaculis quam erat, vel sagittis nisl viverra eu. Sed turpis ante, sagittis et tempor non, tempor eget tellus. Nullam aliquet tellus in tortor tempor eleifend. Proin augue felis, scelerisque a massa quis, consectetur volutpat orci. Fusce a libero nec ex dignissim viverra. Nulla in varius lectus.\n<br>\nCurabitur elementum rutrum sem sit amet vulputate. Sed pulvinar feugiat tempor. Ut ultrices sodales erat, sed pulvinar nunc rhoncus et. Integer porttitor, massa luctus euismod vestibulum, enim urna dignissim enim, aliquet posuere odio velit vel ipsum. Cras eget nulla mauris. Cras lobortis dolor non nibh tempus finibus sit amet sed orci. Pellentesque magna purus, interdum eget consequat vitae, posuere ac dui. Phasellus et placerat justo. Aenean eu ligula in neque lobortis porttitor.\n<br>\nFusce semper lobortis odio vitae luctus. Aliquam consectetur elementum finibus. Suspendisse rutrum sollicitudin sem id euismod. Maecenas quam velit, fringilla sit amet dui nec, tincidunt interdum augue. Proin nec nunc in justo semper gravida. Nam aliquet vel turpis quis lobortis. Mauris condimentum euismod ante a cursus. Suspendisse gravida odio in lacus molestie tristique. Integer ullamcorper libero ac viverra fermentum. Praesent sit amet vulputate magna. Mauris fringilla nunc orci, vel porttitor arcu laoreet eu. Maecenas mollis lobortis nisl, at efficitur metus commodo sit amet. Mauris venenatis faucibus sodales. Quisque scelerisque dolor vel urna fringilla dictum. Maecenas eget nulla lacus. Donec ut erat a quam consectetur volutpat.\n<br>\nVestibulum venenatis, lectus vel interdum rhoncus, elit justo facilisis mauris, vel viverra risus ex quis est. Morbi consequat molestie tellus, in consectetur purus. Morbi eu molestie libero. Ut hendrerit vitae dolor vitae consequat. Donec sollicitudin, urna eget tempus tristique, tellus ipsum scelerisque purus, quis gravida mauris tellus vehicula enim. Curabitur vehicula metus ac ligula convallis sagittis. Nunc lacinia ac sem eget dignissim. Donec eu eros et dui rhoncus sollicitudin. Quisque elementum, libero ut posuere dignissim, lectus risus faucibus elit, quis cursus nulla magna nec purus. Aliquam posuere vitae est in auctor. Sed vestibulum vehicula nulla vel scelerisque.\n<br>\nNullam vel fermentum velit, quis pretium nunc. Phasellus et vehicula justo. Suspendisse varius vestibulum lectus at malesuada. Nullam tincidunt, odio in tempus tempus, lacus lorem lacinia magna, a tincidunt libero purus ac enim. Suspendisse potenti. Etiam facilisis orci sapien, nec sodales mauris finibus cursus. Aenean vestibulum massa magna, at interdum ante pellentesque vel. Vestibulum et ligula tempus justo congue congue id in ipsum. In iaculis leo quis ante rutrum viverra. Duis dictum quam id eros ultrices eleifend. Fusce lacinia sodales feugiat. Pellentesque mattis tincidunt ultricies. Nulla sit amet lectus turpis. Donec auctor metus eu nunc lacinia tristique. Quisque eu accumsan lacus, eget consectetur lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>\n</div>";

/***/ }
]);
//# sourceMappingURL=index.js.map