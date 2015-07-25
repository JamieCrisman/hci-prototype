'use strict';

require('jquery');
require('angular');

var app = require('../module');

app.controller('HomeController', function($scope) {

});

app.TEMPLATES = {
  HOME: require('./template.html')
};

module.exports = app;