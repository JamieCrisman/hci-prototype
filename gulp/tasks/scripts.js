var gulp = require('gulp');
var config = require('../config');
var del = require('del');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  var theScripts = gulp.src(config.paths.scripts)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(config.scripts.dest));
});