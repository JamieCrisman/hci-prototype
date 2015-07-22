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
  less: {
    src: 'project/app/index.less',
    targets: 'project/app/**/*.less',
    dest: 'build/css',
    destMaps: './maps', // relative to dest folder
    browsers: [
      '> 1%',
      'last 3 versions',
      'ie 8', 'ie 9'
    ]
  },
  css: {
    src: 'css/**/*.css'
  },
  app: {
    src: 'project/app/index.js',
    dest: './build' // webpack requires absolute paths
  },
  vendor: {
    src: 'project/app/vendor.js',
    dest: './build'
  },
  markup: {
    src: 'project/app/index.html',
    dest: './public'
  },
  templates: {
    src: 'app/**/*.html',
    base: 'src',
    dest: './public'
  },
  paths: {
    scripts: [
      "bower_components/webcomponentsjs/webcomponents-lite.js",
      "bower_components/jquery/dist/jquery.js",
      "bower_components/time-elements/time-elements.js",
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
  }
};