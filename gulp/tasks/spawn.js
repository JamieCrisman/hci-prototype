var gulp = require('gulp');
var child = require('child_process').spawn;
var reload = require('gulp-livereload');
var util = require('gulp-util');

//spawn server
var server;
gulp.task('spawn', function() {
  if (server)
    server.kill();

  /* Spawn application server */
  server = child('/home/awkwardhero/go/bin/kouen');

  /* Trigger reload upon server start */
  server.stdout.once('data', function() {
    reload.reload('/');
  });

  /* Pretty print server log output */
  server.stdout.on('data', function(data) {
    var lines = data.toString().split('\n')
    for (var l in lines)
      if (lines[l].length)
        util.log(lines[l]);
  });

  /* Print errors to stdout */
  server.stderr.on('data', function(data) {
    process.stdout.write(data.toString());
  });
});