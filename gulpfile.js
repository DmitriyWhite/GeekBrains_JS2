var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-clean-css');
gulp.task('sass', function () {
   return gulp.src('app/scss/**/*.scss')
       .pipe(sass())
       .pipe(gulp.dest("app/css"))
       .pipe(browserSync.reload({
           stream:true
       }))
});
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});
gulp.task('watch',['browserSync', 'sass'], function () {
   gulp.watch('app/scss/**/*.scss',['sass']);
   gulp.watch('app/*.html', browserSync.reload);
   gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('useref', function () {
   return gulp.src('app/*.html')
       .pipe(useref())
       .pipe(gulpif('*.js', uglify()))
       .pipe(gulpif('*.css', minifyCss()))
       .pipe(gulp.dest('dist'));
});