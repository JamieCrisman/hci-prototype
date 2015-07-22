var gulp = require('gulp');
var sync = require('gulp-sync')(gulp).sync;
/*
 * Watch source for changes and restart application server.
 */
gulp.task('watch', function() {

  /* Restart application server */
  gulp.watch([
    'templates/**/*.tmpl',
    'assets/css/*.scss'
  ], ['sass','spawn']);

  /* Rebuild and restart application server */
  gulp.watch([
    '*/**/*.go',
  ], sync([
    'sass',
    'build',
    'spawn'
  ], 'server'));
});