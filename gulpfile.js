var gulp = require('gulp');
var useref = require('gulp-useref');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var babel = require('gulp-babel');
var minifyCss = require('gulp-clean-css');
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
});
gulp.task('watch', ['useref', 'browserSync'], function () {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('useref', function () {
    return gulp.src('app/**/*')
        .pipe(useref())
        .pipe(gulpif('*.js', babel({
            presets: ['es2015']
        })))
        //.pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
