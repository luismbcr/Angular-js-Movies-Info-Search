// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync').create(),
    del = require('del');

//HTMl 
gulp.task('html', function(){
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'));
});
//browser
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});



// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  //watch .html files
  gulp.watch('src/**/*.html', ['html']);
  // Create LiveReload server
  livereload.listen();
  browserSync.init({
        server: "dist/"
    });
  
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
  gulp.watch(['dist/**']).on('change', browserSync.reload);

});

// Default task
gulp.task('default', ['html','styles','scripts','images','watch']);