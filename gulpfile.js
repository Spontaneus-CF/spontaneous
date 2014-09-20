var gulp = require('gulp');
var rimraf = require('gulp-rimraf'); //clean
var gcopy = require('gulp-copy');
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var jasmine = require('gulp-jasmine');
var rename = require('gulp-rename');
var brow = require('gulp-browserify-thin');

var paths = {
  app: 'app/js/**/*.js',
  view: 'app/views/*.html',
  styles: 'app/styles/*.css',
  index: 'app/index.html'
};

gulp.task('clean', function() {
  gulp.src('build/*', { read: false })
    .pipe(rimraf());
});

gulp.task('copy', function() {
  gulp.src(paths.view)
    .pipe(gulp.dest('build/'));
});

gulp.task('lint', function() {
  gulp.src([paths.app])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// gulp.task('build', function() {
//   gulp.src('app/js/app.js', {read: false})
//     .pipe(browserify())
//     .pipe(rename('bundle.js'))
//     .pipe(gulp.dest('./build'));
// });

gulp.task('brow', ['clean'], function() {
  var b = brow('./app/js/app.js');

  var stream = b.bundle('bundle.js');

  stream.pipe(gulp.dest('./build'));

});

gulp.task('default', ['clean', 'copy', 'lint', 'brow']);
  // gulp.watch([paths.app, paths.view, paths.styles, paths.index], function() {
  //   gulp.run('clean', 'lint', 'copy', 'brow');
  // });
// });


// JSCS
// Test