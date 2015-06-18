(function () {
  'use strict';

  var gulp = require('gulp');
  var plumber = require('gulp-plumber');
  var args = require('yargs').argv;
  var uglify = require("gulp-uglify");
  var sass = require('gulp-sass');
  var gulpif = require("gulp-if");
  var reload = require('gulp-livereload');
  var sync = require('gulp-sync')(gulp).sync;
  var child = require('child_process');
  var util = require('gulp-util');
  var mincss = require('gulp-minify-css');

  var paths = {
    scripts: [
      "assets/js/*.js"
    ],
    sass: [
      './assets/css/*.scss',
      './assets/css/*.css'
    ]
  };

  var server;

  /*
   * Build application server.
   */
  gulp.task('build', function() {
    return child.spawnSync('go', ['install']);
  });

  /*
   * Restart application server.
   */
  gulp.task('spawn', function() {
    if (server)
      server.kill();

    /* Spawn application server */
    server = child.spawn('/home/awkwardhero/go/bin/kouen');

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

  gulp.task("sass", function () {
    var sassConfig = {
      css: "public/css",
      sass: "./sass",
      style: "compressed",
      project: __dirname
    };

    if (args.debug) {
      sassConfig.style = "expanded";
    }

    return gulp.src(paths.sass)
      .pipe(plumber())
      .pipe(sass(sassConfig))
      //.pipe(gulpif(!args.debug, uglify()))
      .pipe(gulpif(!args.debug, mincss()))
      .pipe(plumber.stop())
      .pipe(gulp.dest('public/assets/css/'));

  });

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

  gulp.task("default", ["sass", "build", "spawn", "watch"]);
})();