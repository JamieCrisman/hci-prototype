var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('default', function() {
  runSequence(
    'clean',
    'build',
    ['sass', 'scripts', 'images'],
    'spawn',
    'watch'
  );
});