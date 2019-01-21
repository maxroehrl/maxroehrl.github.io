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

// Rerun task if files change
function watch() {
    gulp.watch(SRC.HTML, html);
    gulp.watch(SRC.IMG, img);
    gulp.watch(SRC.JS, js);
    gulp.watch(SRC.CSS, css);
}

// Delete all files under dist
function clean() {
    return del([DIST.HTML]);
}

// Minify all .html files
function html() {
    return gulp.src(SRC.HTML)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(DIST.HTML));
}

// Minify all .js files
function js() {
    return gulp.src(SRC.JS)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST.JS));
}

// Optimize all .png and .svg files
function img() {
    return gulp.src(SRC.IMG)
        .pipe(imagemin())
        .pipe(gulp.dest(DIST.IMG));
}

// Autoprefix and minify all .css files
function css() {
    var processors = [
        autoprefixer({ browsers: ['last 2 versions'] }),
        cssnano()
    ];
    return gulp.src(SRC.CSS)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST.CSS));
}

// Rebuild the project
var build = gulp.series(clean, gulp.parallel(html, js, img, css));

exports.clean = clean;
exports.watch = watch;
exports.build = build;

exports.default = build;