'use strict';

require('jquery');
//require('angular');
require('moment');

var app = require('../module');

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
  		$scope.entries = response.data.data.commits;
  	}
  });

});

module.exports = app;