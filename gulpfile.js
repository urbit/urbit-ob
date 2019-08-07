var gulp = require('gulp');
var rollup = require('gulp-better-rollup');
var sucrase = require('@sucrase/gulp-plugin');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var builtins = require('rollup-plugin-node-builtins');
var globals = require('rollup-plugin-node-globals');
var rootImport = require('rollup-plugin-root-import');

gulp.task('default', function(cb) {
  return gulp
    .src('src/index.js')
    .pipe(rollup({
      plugins: [
        // the order of these plugins matter
        commonjs(),
        replace({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        rootImport({
          root: `${__dirname}/dist`,
          useEntry: 'prepend',
          extensions: '.js'
        }),
        globals(),
        builtins(),
        resolve()
      ]
    }, 'cjs'))
    .on('error', function(e){
      console.log(e);
      cb();
    })
    .pipe(gulp.dest('./dist/'))
    .on('end', cb);
});
