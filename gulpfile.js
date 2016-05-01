require('babel-core/register');

const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const notice = require('gulp-notice');
const mocha = require('gulp-mocha');

gulp.task('clean', () => {
  del(['dist/**/*', '!dist/', '!dist/.gitkeep']);
});

gulp.task('transpile', ['clean'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(notice())
    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['transpile'], () =>
  gulp.src('test/index.js', {
    read: false
  })
  .pipe(mocha({ reporter: 'spec' })) // , timeout: 6000
);

gulp.task('default', ['transpile']);
