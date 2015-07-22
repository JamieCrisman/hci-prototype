var gulp = require('gulp');
var config = require('../config');
var vulcanize = require('gulp-vulcanize');
var del = require('del');
var $ = require('gulp-load-plugins')();

gulp.task('vulcanize:setup', function(cb){
  del(['public/elements/*'], function(){
    cb();
  });
})


// Vulcanize imports
gulp.task('vulcanize:compile', ['vulcanize:setup'], function () {

  return gulp.src(config.paths.elements)
    .pipe(vulcanize({
      dest: config.paths.publicElements[0],
      strip: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest(config.paths.publicElements[0]))
    .pipe($.size({title: 'vulcanize'}));
});

gulp.task("vulcanize", ['vulcanize:setup', 'vulcanize:compile']);