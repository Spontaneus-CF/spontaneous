var gulp = require('gulp');
var rimraf = require('gulp-rimraf'); //clean
var gcopy = require('gulp-copy');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var jasmine = require('gulp-jasmine');
var rename = require('gulp-rename');
var brow = require('gulp-browserify-thin');

var paths = {
  app: './app/js/**/*.js',
  view: './app/views/*.html',
  styles: './app/styles/**/*.*',
  index: './app/index.html',
  images: './app/images/*.*'
};

gulp.task('clean', function() {
  gulp.src('build/*', { read: false })
    .pipe(rimraf());
});

gulp.task('testClean', function() {
  gulp.src('test/*.*', { read: false })
    .pipe(rimraf());
});

gulp.task('copy', function() {
  gulp.src([paths.view, paths.styles, paths.index, paths.images], {base: './app'})
    .pipe(gulp.dest('build/'));
});

// gulp.task('testCopy', function() {
//   gulp.src(['./test/angular/*']);
//     .pipe(gulp.dest('test/'));
// });

gulp.task('lint', function() {
  gulp.src([paths.app])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('brow', ['clean'], function() {
  var b = brow('./app/js/app.js')
    .transform('debowerify');

  var stream = b.bundle('bundle.js');

  stream.pipe(gulp.dest('./build'));

});

gulp.task('karma', ['testBrow'], function() {
    return gulp.src('./test/testBundle.js')
    .pipe(karma({
      configFile: 'karma.config.js',
      action: 'run'
    }))
    .on('error', function(err){
      throw err;
    });
});


gulp.task('testBrow', ['testClean'], function() {
  var c = brow('./test/angular/user-controller-test.js')
    .transform('debowerify');

  var stream = c.bundle('testBundle.js');

  stream.pipe(gulp.dest('./test'));

});

gulp.task('default', ['clean', 'copy', 'lint', 'brow']);
gulp.task('test', ['testClean', 'testBrow', 'karma']);
  // gulp.watch([paths.app, paths.view, paths.styles, paths.index], function() {
  //   gulp.run('clean', 'lint', 'copy', 'brow');
  // });
// });


// JSCS
// Test
