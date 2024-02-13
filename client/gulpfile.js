const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss')

function buildStyles() {
  return src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(purgecss({ content: ['src/*.html'] }))
    .pipe(dest('src/css'))
}

function watchTask() {
  watch(['src/css/**/*.scss', 'src/*.html', 'src/components/**/*.js'], buildStyles)
}

exports.default = series(buildStyles, watchTask)