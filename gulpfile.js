'use strict';
var gulp         = require('gulp');
var del          = require('del');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var htmlmin      = require('gulp-htmlmin');
var imagemin     = require('gulp-imagemin');
var uglify       = require('gulp-uglify');

var DIST = {
    HTML: 'dist',
    IMG: 'dist/img',
    JS: 'dist/js',
    CSS: 'dist/css'
};

var SRC = {
    HTML: 'src/**/*.html',
    IMG: ['src/img/**/*.png', 'src/img/**/*.svg'],
    JS: 'src/js/**/*.js',
    CSS: 'src/css/**/*.css'
};

gulp.task('default', ['watch']);

// Rerun task if files change
gulp.task('watch', function () {
    gulp.watch(SRC.HTML, ['html']);
    gulp.watch(SRC.IMG, ['img']);
    gulp.watch(SRC.JS, ['js']);
    gulp.watch(SRC.CSS, ['css']);
});

// Delete all files under dist
gulp.task('clean', function () {
    return del([DIST.HTML]);
});

// Rebuild the project
gulp.task('build', ['html', 'js', 'img', 'css']);

// Minify all .html files
gulp.task('html', function () {
    return gulp.src(SRC.HTML)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(DIST.HTML));
});

// Minify all .js files
gulp.task('js', function () {
    return gulp.src(SRC.JS)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST.JS));
});

// Optimize all .png and .svg files
gulp.task('img', function () {
    return gulp.src(SRC.IMG)
        .pipe(imagemin())
        .pipe(gulp.dest(DIST.IMG));
});

// Autoprefix and minify all .css files
gulp.task('css', function () {
    var processors = [
        autoprefixer({ browsers: ['last 2 versions'] }),
        cssnano()
    ];
    return gulp.src(SRC.CSS)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST.CSS));
});