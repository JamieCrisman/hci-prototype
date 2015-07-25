// Install Golang Project
var gulp = require('gulp');
var child = require('child_process').spawn;
var webpack = require('webpack');
var gUtil = require('gulp-util');

var webpackConfig = require('../webpack/webpack-config');
var loaded = false;

gulp.task('build', ['build:web'], function() {
  var process = child('go', ['install']);

  process.stderr.on('data', function (buffer) {
    throw new gUtil.PluginError({
      plugin: 'Kouen',
      message: 'Build Failure: \n' + gUtil.colors.red(buffer.toString())
    });
  });

  return process;
});

gulp.task('build:web', function(cb) {
  webpack(webpackConfig, function(err, stats) {
    if(err) {
      throw new gUtil.PluginError('webpack:build-dev', err);
    }

    var _stats = stats.toString({
      colors: true,
      cached: true,
      reasons: false,
      source: false,
      chunks: false
    });

    gUtil.log('[build:webpack]', _stats);

    if(!loaded) {
      cb();
      loaded = true;
    }

  });
});