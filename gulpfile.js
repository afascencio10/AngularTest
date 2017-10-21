var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-clean-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8081",
    files: ["client/templates/*.*", "client/assests/*.*"],
    browser: "google chrome",
    port: 7000,
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'server/server.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('styles', function(){
  gulp.src(['client/assets/sass/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('client/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('client/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('client/assets/js/**/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('client/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('server', function (cb) {
  exec('node .', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("client/assets/sass/**/*.scss", ['styles']);
  gulp.watch("client/assets/js/**/*.js", ['scripts']);
  gulp.watch("**/*.html", ['bs-reload']);
});
