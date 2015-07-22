var gulp = require('gulp');
var args = require('yargs').argv;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var mincss = require('gulp-minify-css');
var config = require('../config');
var gulpif = require("gulp-if");

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

  return gulp.src(config.paths.sass)
    .pipe(plumber())
    .pipe(sass(sassConfig))
    .pipe(gulpif(!args.debug, mincss()))
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/assets/css/'));

});