var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var less         = require('gulp-less');
var autoPrefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var cssMin       = require('gulp-cssmin');
var path         = require('path');
var browserify   = require('browserify');
var source       = require("vinyl-source-stream");
// var buffer       = require("vinyl-buffer");
var uglify       = require("gulp-uglify");
var streamify    = require('gulp-streamify');
var sourcemaps   = require("gulp-sourcemaps");

var dir = {
  'less'   : 'src/less',
  'css'    : 'dist/css/',
  'js'     : 'src/javascript',
  'bundle' : 'dist/javascript/'
}

gulp.task('less', function() {
  // gulp.src(dir.less + 'app.less')
  gulp.src(path.join(dir.less, '**/app.less'), { base: dir.less })
    .pipe(less())
    .pipe(plumber())
    // .pipe(cssMin())
    .pipe(gulp.dest(dir.css));
});

gulp.task("bundle", function() {
  browserify({
    entries: [dir.js + '/app.js']
  })
  .bundle()
  .pipe(plumber())
  .pipe(source('app.js'))
  .pipe(sourcemaps.write())
  .pipe(streamify(uglify()))
  .pipe(gulp.dest(dir.bundle));
});

gulp.task('watch', function(){
  gulp.watch([dir.less + '/*.less'], ['less']);
  gulp.watch([dir.js + '/*.js'], ['bundle']);

  gulp.watch(['*.html'], ['reload']);
  gulp.watch([dir.css, '/*.css'], ['reload']);
});

gulp.task('default', ['browserSync', 'watch']);

gulp.task("browserSync", function() {
  browserSync({
    https: false,
    server: {
      baseDir: './',
    },
    open: false
  });
});

gulp.task('reload', function () {
	browserSync.reload();
});
