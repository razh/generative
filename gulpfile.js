'use strict';

const PORT = process.env.PORT || 3000;

const SOURCE_DIR = './src';
const BUILD_DIR = 'dist';

const _ = require('lodash');
const babelify = require('babelify');
const brfs = require( 'brfs' );
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const glslify = require('glslify');
const del = require('del');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

function onError(error) {
  $.util.log(error.message);
  this.emit('end');
}

gulp.task('browser-sync', () => {
  return browserSync.init({
    browser: [],
    port: PORT,
    server: {
      baseDir: './' + BUILD_DIR
    }
  });
});

gulp.task('js', () => {
  const bundler = watchify(browserify(SOURCE_DIR + '/js/index.js',
    _.assign({
      debug: true
    }, watchify.args)));

  bundler
    .transform(babelify)
    .transform(brfs)
    .transform(glslify);

  function rebundle() {
    return bundler.bundle()
      .on('error', onError)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(BUILD_DIR))
      .pipe(browserSync.reload({stream: true}));
  }

  bundler
    .on('log', $.util.log)
    .on('update', rebundle);

  return rebundle();
});

gulp.task('html', () => {
  return gulp.src(SOURCE_DIR + '/*.html')
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', () => del([BUILD_DIR]));

gulp.task('watch', () => gulp.watch([SOURCE_DIR + '/*.html'], ['html']));

gulp.task('default', ['clean'], cb => {
  return runSequence(
    ['html', 'js'],
    ['browser-sync', 'watch'],
    cb
  );
});
