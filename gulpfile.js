'use strict';

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    del        = require('del'),
    uglify     = require('gulp-uglify'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss  = require('gulp-minify-css'),
    inject     = require('gulp-inject');

var paths = {
  app: {
    js: {
      app: [
        'app/app.js',
        'app/directives/*.js',
        'app/directives/**/*.js',
        'app/directives/**/**/*.js',
        'app/directives/**/**/**/*.js',
        'app/directives/**/**/**/**/*.js',
        'app/directives/**/**/**/**/**/*.js',
        'app/pages/*.js',
        'app/pages/**/*.js',
        'app/pages/**/**/*.js',
        'app/pages/**/**/**/*.js',
        'app/pages/**/**/**/**/*.js',
        'app/pages/**/**/**/**/**/*.js',
        'app/services/*.js',
        'app/services/**/*.js',
        'app/services/**/**/*.js',
        'app/services/**/**/**/*.js',
        'app/services/**/**/**/**/*.js',
        'app/services/**/**/**/**/**/*.js',
      ],
      libs: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angularjs/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/d3/d3.min.js',
        'bower_components/nvd3/nv.d3.min.js',
        'bower_components/angular-nvd3/dist/angular-nvd3.min.js',
        'bower_components/ngstorage/ngStorage.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
      ]
    },
    css: [
      'app/style.scss',
      'app/*.scss',
      'app/**/*.scss',
      'app/**/**/*.scss',
      'app/**/**/**/*.scss',
      'app/**/**/**/**/*.scss',
      'app/**/**/**/**/**/*.scss'
    ],
    img: [
      'app/img/*.{png,jpg,jpeg,gif,webp,svg}',
      'app/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
      'app/img/**/**/*.{png,jpg,jpeg,gif,webp,svg}',
      'app/img/**/**/**/*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    ico: [
      'app/*.ico'
    ],
    html: 'app/index.html',
    templates: [
      'app/directives/*.html',
      'app/directives/**/*.html',
      'app/directives/**/**/*.html',
      'app/directives/**/**/**/*.html',
      'app/directives/**/**/**/**/*.html',
      'app/directives/**/**/**/**/**/*.html',
      'app/directives/**/**/**/**/**/**/*.html',
      'app/directives/**/**/**/**/**/**/**/*.html',
      'app/pages/*.html',
      'app/pages/**/*.html',
      'app/pages/**/**/*.html',
      'app/pages/**/**/**/*.html',
      'app/pages/**/**/**/**/*.html',
      'app/pages/**/**/**/**/**/*.html',
      'app/pages/**/**/**/**/**/**/*.html',
      'app/pages/**/**/**/**/**/**/**/*.html'
    ]
  },

  dest: {
    root: 'build',
    js: 'build',
    libs: 'build',
    css: 'build',
    img: 'build/img',
    ico: 'build',
    map: '/'
  }
};

gulp.task('clean', function (cb) {
  del(['build/app.js'], cb);
});

gulp.task('appScripts', function () {
  return gulp.src(paths.app.js.app)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('appLibs', function () {
  return gulp.src(paths.app.js.libs)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.libs));
});

gulp.task('appStyles', function () {
  gulp.src(paths.app.css)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(sourcemaps.write(paths.dest.map))
    .pipe(gulp.dest(paths.dest.css));
});


gulp.task('appImg', function () {
  gulp.src(paths.app.img)
      .pipe(gulp.dest(paths.dest.img));
});

gulp.task('appIco', function () {
  gulp.src(paths.app.ico)
      .pipe(gulp.dest(paths.dest.ico));
});

gulp.task('appHtml', function () {
  return gulp.src(paths.app.html)
    .pipe(inject(gulp.src(paths.app.templates), {
      transform: function (filepath, file) {
        return '<script type="text/ng-template" id="' + file.relative.replace(/\\/g, '/') + '">' +
          file.contents.toString() + '</script>';
      }
    }))
    .pipe(gulp.dest(paths.dest.root));
});

gulp.task('watch', ['appHtml', 'appScripts', 'appLibs', 'appImg', 'appIco', 'appStyles'], function () {
  gulp.watch(paths.app.js.app, ['appScripts']);
  gulp.watch(paths.app.js.libs, ['appLibs']);
  gulp.watch(paths.app.css, ['appStyles', 'appImg']);
  gulp.watch(paths.app.html, ['appHtml', 'appImg', 'appIco']);
  gulp.watch(paths.app.templates, ['appHtml', 'appImg']);
  gulp.watch(paths.app.img, ['appImg']);
  gulp.watch(paths.app.ico, ['appIco'])
});
gulp.task('default', [
  'appImg',
  'appIco',
  'appScripts',
  'appLibs',
  'appStyles',
  'appHtml',
  'watch'
]);