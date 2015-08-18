'use strict';

var app = require('../module');

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