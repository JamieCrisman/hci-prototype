var gulp = require('gulp');
var config = require('../config');

gulp.task('images', function() {
  var theScripts = gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest));
});