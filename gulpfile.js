// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var sass         = require('gulp-sass'); // Compile our Sass








// Compile Our Sass
gulp.task('sass', function() {
    gulp.src([
        'scss/*.scss',
        ])
        .pipe(sass())
		.pipe(gulp.dest('css/'))
});







// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'watch']);
