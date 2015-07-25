var gulp = require('gulp');
var config = require('../config');

gulp.task('clean', function(cb) {
  var del = require('del');
  del([config.app.dest], cb);
});