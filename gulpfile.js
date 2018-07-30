const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const sassPartialsImported = require('gulp-sass-partials-imported');

const reload = browserSync.reload

let scss_dir = './public/css/scss/';
let includePaths = ['./public/css/scss/'];

gulp.task('browser-sync', function() {
    browserSync.init({
        notify: false,
        proxy: "localhost:9393"
    })
    gulp.watch('./*.hbs', ['html'])
    gulp.watch('./public/css/scss/*.scss', ['css'])
    gulp.watch('./public/js/*.js', reload)
})

gulp.task('css', () => {
    return gulp.src('./public/css/scss/*.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sassPartialsImported(scss_dir, includePaths))
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream())
        .on('end', reload)
})

gulp.task('html', () => {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./'))
        .on('end', reload)
})

gulp.task('default', ['browser-sync', 'html', 'css'])