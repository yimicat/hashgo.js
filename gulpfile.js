var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('minjs', function() {
    gulp.src(['src/js/*.js'])
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});


