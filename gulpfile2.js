'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./assets/css/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./public/assets/css/'));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', [
    'sass',
    'watch'
]);