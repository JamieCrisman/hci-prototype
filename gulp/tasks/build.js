// Install Golang Project
var gulp = require('gulp');
var child = require('child_process').spawn;

gulp.task('build', function() {
  var process = child('go', ['install']);

  process.stderr.on('data', function (buffer) {
    throw new util.PluginError({
      plugin: 'Kouen',
      message: 'Build Failure: \n' + util.colors.red(buffer.toString())
    });
  });

  return process;
});