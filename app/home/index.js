'use strict';

require('jquery');
require('angular');
require('moment');

var app = require('../module');

app.controller('HomeController', function($scope, $http) {
  $scope.recentPosts = [];
  $scope.journalPosts = [];

  var requestRecents = {
  	method: 'GET',
  	url: '/api/index',
  	cache: true
  };
  var requestJournal = {
  	method: 'GET',
  	params: {
		entry: "apa",
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

app.TEMPLATES = {
  HOME: require('./template.html')
};

module.exports = app;