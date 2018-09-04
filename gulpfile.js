var gulp = require('gulp');

var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');

var babel = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var json = require('rollup-plugin-json');
var builtins = require('rollup-plugin-node-builtins');
var rootImport = require('rollup-plugin-root-import');
var globals = require('rollup-plugin-node-globals');
var uglify = require('rollup-plugin-uglify-es');

var cache;

gulp.task('default', function(cb) {
  return rollup({
    input: './src/index.js',
    cache: cache,
    format: "es",
    plugins: [
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/lodash/lodash.js': [
            'reduce',
            'isUndefined',
            'isString',
            'every',
            'map'
          ]
        }
      }),
      babel({
        plugins: ['babel-plugin-lodash'],
        ignore: ['node_modules/**', 'test/**']
      }),
      json(),
      globals(),
      builtins(),
      uglify(),
    ]
  }).on('bundle', function(bundle){ cache = bundle; })
    .on('error', function(e){
      console.log(e);
      cb();
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb);
});


// gulp.task('watch', gulp.series('default', function() {
//   gulp.watch('src/**/*.js', gulp.parallel('bundle-js'));
// }));
