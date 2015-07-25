var gulp = require('gulp');
var args = require('yargs').argv;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var mincss = require('gulp-minify-css');
var config = require('../config');
var gulpif = require("gulp-if");
var concat = require('gulp-concat');

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
  var printError = function(e) {
    console.log(e);
  };

  return gulp.src(config.paths.sass)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!args.debug, mincss()))
    .pipe(concat('index.css').on('error', printError))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.styles.dest));
});