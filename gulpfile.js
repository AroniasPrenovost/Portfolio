// Include gulp
var gulp = require('gulp');
 
// Include Our Plugins
var plumber      = require('gulp-plumber'); // To handle error events
var eslint       = require('gulp-eslint'); // To parse/display JS errors including formatting errors against standards
var cssmin       = require('gulp-cssmin'); // Minify
var sass         = require('gulp-sass'); // Compile our Sass
var sourcemaps   = require('gulp-sourcemaps'); // Sass Sourcemaps
var concat       = require('gulp-concat'); // Concatinate JS
var uglify       = require('gulp-uglify'); // Pass through Uglification
var rename       = require('gulp-rename'); // Rename files after compilation
var autoprefixer = require('gulp-autoprefixer'); // Automatically add CSS prefixes for greater CSS3 browser support
var notify       = require("gulp-notify"); // Ability to send error notifications
var beep         = require('beepbeep'); // Make beeping noise if error
 
/**
 * Error handler
 */
var onError = function(err) {
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beep(3); // If I'm annoying remove me!!
    this.emit('end');
};
 
/**
 * Lint Task (Checks for javascript errors and formatting errors)
 */
gulp.task('lint', function() {
    return gulp.src('/scripts/components/**').pipe(eslint({
        'rules':{
            'semi': [1, 'always']
        }
    }))
        .pipe(eslint.format())
        // Brick on failure to be super strict
        .pipe(eslint.failOnError());
});
 
/**
 * Compile Our Sass
 */
gulp.task('sass', function() {
    gulp.src([
    	"./css/slick-theme.css",
    	"./css/slick.css",
        './scss/*.scss',
        ])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: [

        ]}))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
        }))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('./app.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'))
        .pipe(notify({message: 'Sass complilation is complete!', onLast: true}));
});
 
 
/**
 * Concatenate & Minify JS
 */
gulp.task('scripts', function() {
    gulp.src([
    	//Add JS here
        "./js/slick.js",
        "./js/components/*.js"
    ])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('./all.js'))
        .pipe(rename('./aron.js'))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(uglify())
        .pipe(gulp.dest('./scripts'))
        .pipe(notify({message: 'Script compilation is complete!', onLast: true}));
});
 

/**
 * Watch Files For Changes
 */
gulp.task('watch', function() {
    gulp.watch(['js/components/*.js'], ['lint', 'scripts']);
    gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass']);
});
 

/**
 * Default Task
 */
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);


