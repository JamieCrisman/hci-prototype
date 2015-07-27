'use strict';

require('jquery');
require('angular');
require('moment');

var app = require('../module');

app.controller('HomeController', function($scope) {
  $scope.createDate = moment().subtract(10,'days');
});

app.TEMPLATES = {
  HOME: require('./template.html')
};

module.exports = app;