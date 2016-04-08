var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf')
var path = require('path')

gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', function(evt) {
        // evt.type = add, change, delete
        // evt.path
        rimraf(path.join(__dirname, 'dist/*'), function() {
            build() 
        })
        
    })
});

function build() {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', {
            destPath: 'dist',
            includeContent: false
        }))
        .pipe(gulp.dest('./dist'));
}

gulp.task('build', function () {
    return build()
});

gulp.task('default', ['build']);
