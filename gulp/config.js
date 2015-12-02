var path = require('path');

module.exports = {
  project: {
    path: path.resolve(__dirname, '..')
  },
  bower: {
    src: path.join(__dirname, '..', 'bower_components')
  },
  js: {
    src: 'project/app/**/*.js',
    srcAll: ['gulpfile.js', 'app/**/*.js'],
    specs: 'app/**/*-spec.js'
  },
  css: {
    src: 'css/**/*.css'
  },
  app: {
    src: 'app/index.js',
    dest: 'public/*'
  },
  vendor: {
    src: 'app/vendor.js',
    dest: './public'
  },
  markup: {
    src: 'app/index.html',
    dest: './public'
  },
  templates: {
    src: 'app/**/*.html',
    base: 'src',
    dest: './public'
  },
  scripts: {
    dest: 'public/js'
  },
  images: {
    src: 'app/assets/images/*/**',
    dest: 'public/images'
  },
  styles: {
    dest: 'public/css'
  },
  paths: {
    scripts: [
      "bower_components/webcomponentsjs/webcomponents-lite.js",
      "bower_components/jquery/dist/jquery.js",
      "bower_components/time-elements/time-elements.js",
      "bower_components/dist/js/bootstrap.js",
      "bower_components/angular/angular.js",
      "bower_components/angular-loader/angular-loader",
      "bower_components/angular-ui-router/release/angular-ui-router.js",
    ],
    sass: [
      "app/assets/css/kouen.scss"
    ],
    elements: [
      'polymer/elements/elements.html'
    ],
    publicElements: [
      'public/elements'
    ]
  }
};