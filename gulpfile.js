'use strict';

//Required//

var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watchify = require('watchify');
var browserify = require('browserify');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var del = require('del');



// Scripts Tasks (Browserify, Watchify, Uglify) //
// add custom browserify options here
var customOpts = {
  entries: ['./src/scripts/main.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

// add transformations here
gulp.task('scripts', bundle); // so you can run `gulp scripts` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, gutil.colors.red(
       '\n\n*********************************** \n' +
      'BROWSERIFY ERROR:' +
      '\n*********************************** \n\n'
      )))
    .pipe(source('main.min.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('../maps')) // writes .map file
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream:true}));
}



// CSS Tasks // (Sass, csso(minify))
gulp.task('css', function() {
    return gulp.src(['src/styles/style.scss'])
        .pipe(rename('main.css'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({stream:true}));
});



// bower_components compile to dist //
gulp.task('bower-compile', function () {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});

    var compileJS = gulp.src(mainBowerFiles(), { base: './bower_components'})
        .pipe(jsFilter)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/vendor'))
        .pipe(browserSync.reload({stream:true}));

    var compileCSS = gulp.src('./bower_components/**/*.css')
        //.pipe(cssFilter)
        .pipe(concat('vendor.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css/vendor'))
        .pipe(browserSync.reload({stream:true}));

    return (compileJS, compileCSS);
});



// HTML Tasks //
gulp.task('html', function() {
  return gulp.src('./dist/**/*.html')
    .pipe(browserSync.reload({stream:true}));
});



// Browser-Sync Tasks //

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist/"
        }
    });
});



//Watch Tasks//
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.scss', ['css']);
    gulp.watch('dist/**/*.html', ['html']);
    gulp.watch('src/scripts/**/*.js', ['scripts'])
});



//Default Task//
gulp.task('default', ['scripts', 'css', 'bower-compile', 'browser-sync', 'watch']);
