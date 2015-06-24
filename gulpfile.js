(function () {
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var plumber = require('gulp-plumber');
  var args = require('yargs').argv;
  var uglify = require("gulp-uglify");
  var sass = require('gulp-sass');
  var gulpif = require("gulp-if");
  var del = require('del');
  var reload = require('gulp-livereload');
  var sync = require('gulp-sync')(gulp).sync;
  var child = require('child_process').spawn;
  var util = require('gulp-util');
  var mincss = require('gulp-minify-css');
  var concat = require('gulp-concat');

  var paths = {
    scripts: [
      "bower_components/webcomponentsjs/webcomponents-lite.js",
      "bower_components/jquery/dist/jquery.js",
      "assets/js/bootstrap.min.js"
    ],
    sass: [
      './assets/css/*.scss',
      './assets/css/*.css'
    ],
    elements: [
      'polymer/elements/elements.html'
    ],
    publicElements: [
      'public/elements'
    ]
  };

  var server;

  /*
   * Build application server.
   */
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

  /*
   * Restart application server.
   */
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
      .pipe(gulpif(!args.debug, mincss()))
      .pipe(plumber.stop())
      .pipe(gulp.dest('public/assets/css/'));

  });

  gulp.task('scripts', function() {
    del(['public/assets/js/script.js'], function(){
      var theScripts = gulp.src(paths.scripts)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js/'));
    });
  });

  gulp.task('vulcanize:setup', function(){
    del(['public/elements/*'], function(){
      var bower = gulp.src(['bower_components/**/*'])
      .pipe(gulp.dest('public/bower_components'));

      var routes = gulp.src(['polymer/elements/routing.html'])
      .pipe(gulp.dest('public/elements'));

      var vulcanized = gulp.src(paths.elements)
        .pipe($.rename('elements.vulcanized.html'))
        .pipe(gulp.dest(paths.publicElements[0]));
    });
  })


  // Vulcanize imports
  gulp.task('vulcanize:compile', function () {

    return gulp.src(paths.publicElements[0] + "/elements.vulcanized.html")
      .pipe($.vulcanize({
        dest: paths.publicElements[0],
        strip: true,
        inlineCss: true,
        inlineScripts: true
      }))
      .pipe(gulp.dest(paths.publicElements[0]))
      .pipe($.size({title: 'vulcanize'}));
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

  gulp.task("vulcanize", ['vulcanize:setup', 'vulcanize:compile']);
  gulp.task("default", ["sass", "scripts", "vulcanize", "build", "spawn", "watch"]);
})();