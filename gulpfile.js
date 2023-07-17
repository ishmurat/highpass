const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const browserSync = require('browser-sync').create()
const image = require('gulp-image')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const environments = require('gulp-environments');
const sass = require('gulp-sass')(require('sass'));
const fonter = require('gulp-fonter');

const development = environments.development;
const production = environments.production;

const clean = () => {
  return del(['dist'])
}

const resourses = () => {
  return src('src/resourses/**')
    .pipe(dest('dist'))
}

const styles = () => {
    // return src('src/styles/**/*.css')
    //     .pipe(development(sourcemaps.init()))
    //     .pipe(concat('main.css'))
    //     .pipe(autoprefixes({
    //         cascade: false,
    //     }))
    //     .pipe(cleanCSS({
    //         level: 2
    //     }))
    //     .pipe(development(sourcemaps.write()))
    //     .pipe(dest('dist'))
    //     .pipe(browserSync.stream())
    return src('src/sass/**/*.scss')
    .pipe(development(sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(production(htmlMin({
        collapseWhitespace: true,
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
  .pipe(development(sourcemaps.init()))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(production(uglify({
    toplevel: true
  }).on('error', notify.onError())))
  .pipe(development(sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir:'dist'
        }
    })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg',
    'src/images/svg/*.svg',
    'src/images/**/*.png'
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
}

const fonts = () => {
  return src('./src/fonts/*')
    .pipe(fonter({
        subset: [66,67,68, 69, 70, 71],
        formats: ['woff', 'ttf']
      }))
    .pipe(dest('./dist/fonts'));
};


watch('src/**/*.html', htmlMinify)
// watch('src/styles/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resourses/**', resourses)
watch('src/sass/**/*.scss', styles)


exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resourses, htmlMinify, styles, fonts, scripts, images, svgSprites, watchFiles)


