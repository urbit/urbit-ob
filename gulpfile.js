/***

  MAIN COMMANDS TO RUN:

  `gulp bundle-dev`: Bundle everything for development
  `gulp bundle-prod`:  Bundle everything for production
  `gulp watch`: Watch files, `bundle-dev` on file change

**/

// A task runner that helps automate development tasks
var gulp = require('gulp');
// merges multiple css files into one css file using @import.
// var cssimport = require('gulp-cssimport');
// Minifies CSS – removes unnessecary characters like spaces and line returns to save filesize.
// var cssnano = require('gulp-cssnano');
// A module bundler for JS which compiles small pieces of code into something larger and more complex
var rollup = require('gulp-better-rollup');
// A fast, economical JS transpiler. Takes JS like ES6/7 and transforms it to JS that is consumable by a conventional JS runtime. It is like Babel but faster and less extensible.
var sucrase = require('@sucrase/gulp-plugin');
// Like sucrase, this is a transpiler. It has more features. We occasionally use it because Sucrase does not support the object rest/spread language feature but babel does.
// var babel = require("rollup-plugin-babel");
// removes spaces, line returns and other unnessecary characters from .js files to reduce filesize.
// var minify = require('gulp-minify');
// This is actually a node runtime method. Spawns a shell then executes the command within that shell, buffering any generated output
// var exec = require('child_process').exec;
// runs a hot-loading webserver
// var server = require("gulp-server-livereload");
// allows importing libraries node_modules without specifying path eg "import x from '/node_modules/react'" -> "import x from 'react'"
var resolve = require('rollup-plugin-node-resolve');
// Parses commonjs-style "require" statements as imported modules. Pretty standard dependency required for most NPM-sourced dependencies
var commonjs = require('rollup-plugin-commonjs');
// Replace particular strings with other things
var replace = require('rollup-plugin-replace');
// loads .json files as parsed JSON objects
// var json = require('rollup-plugin-json');
// Many modern NPM repositories are packaged for _node_ environments,
//   and they use _node_ standard library primitives, like
//     - fs
//     - events
//     - buffer
//     - util
// - This plugin shims those node dependencies to work in the browser
// - WARNING: This plugin is very expensive!
//   - Using a library that requires node builtin functions may
//     vastly increase your build size and compile times
var builtins = require('rollup-plugin-node-builtins');
// Complimentary library to builtins() that polyfills more node libraries. You may not need this if you use no Node dependancies, or your dependancies don't have deeper Node dependancies.
var globals = require('rollup-plugin-node-globals');
// go from "import x from '/src/js/components/thing.js'" to "import x from '/components/thing'"  (the preferred import style)
var rootImport = require('rollup-plugin-root-import');


// CSS  ////////////////////////////////////////////////////////////////////////

// gulp.task('css-bundle', function() {
//   return gulp
//     .src('src/css/index.css')
//     .pipe(cssimport())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./dist/css'));
// });



// JS  /////////////////////////////////////////////////////////////////////////

// transpiles JSX
// gulp.task('jsx-transform', function(cb) {
//   return gulp
//     .src('src/**/*.js')
//     .pipe(sucrase({
//       // options: typescript, flow, jsx
//       transforms: ['js']
//     }))
//     .pipe(gulp.dest('dist'));
// });


// resolves JS imports and file transformations not including transpiling JSX
gulp.task('default', function(cb) {
  return gulp
    .src('src/index.js')
    .pipe(rollup({
      plugins: [
        // the order of these plugins matter
        commonjs({
          namedExports: {
            // 'node_modules/react/index.js': [ 'Component, Fragment' ]
          }
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        rootImport({
          root: `${__dirname}/dist`,
          useEntry: 'prepend',
          extensions: '.js'
        }),
        // json(),
        globals(),
        builtins(),
        // babel({
        //   babelrc: false,
        //   extensions: ['js'],
        //   plugins: [
        //     ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }]
        //   ],
        //   exclude: [
        //     "node_modules/**",
        //     "docs/**",
        //     "bin/**",
        //     "assets/**",
        //   ]
        // }),
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


// makes a JS filesize smaller by removing unnessecary chars
// gulp.task('js-minify', function () {
//   return gulp
//     .src('./dist/js/index.js')
//     .pipe(minify())
//     .pipe(gulp.dest('./dist/js/'));
// });



// gulp.task('js-cachebust', function(cb) {
//   return Promise.resolve(
//     exec('git log', function (err, stdout, stderr) {
//       let firstLine = stdout.split("\n")[0];
//       let commitHash = firstLine.split(' ')[1].substr(0, 10);
//       let newFilename = "index-" + commitHash + "-min.js";
//       exec('mv ./dist/js/index-min.js ./dist/' + newFilename);
//     })
//   );
// })


// Runs a hotloading webserver for development. Serves the /dist directory.
// gulp.task("webserver", function() {
//   gulp
//     .src(`./dist/`).pipe(
//     server({
//       livereload: true,
//       open: false,
//       port: 3000,
//       defaultFile: "index.html"
//     })
//   );
// });



// Copies the entry HTML file for a website or webapp
// gulp.task(
//   "copy-html", function() {
//   return gulp
//     .src('./src/index.html')
//     .pipe(gulp.dest('./dist/'));
// });



// Copies the assets folder for a website or webapp with images, fonts etc
// gulp.task(
//   "copy-assets", function() {
//   return gulp
//     .src('./src/assets')
//     .pipe(gulp.dest('./dist/assets'));
// });



// transpiles and bundles JS
// gulp.task(
//   'js-bundle-dev',
//   gulp.series('jsx-transform', 'js-imports')
// );



// transpiles, bundles, minifies and tags JS
// gulp.task(
//   'js-bundle-prod',
//   gulp.series('jsx-transform', 'js-imports', 'js-minify', 'js-cachebust')
// )

//
//
//
// gulp.task('bundle-dev',
//   gulp.series(
//     'copy-html',
//     'copy-assets',
//     gulp.parallel(
//       'css-bundle',
//       'js-bundle-dev'
//     ),
//     'webserver'
//   )
// );
//
//
//
// gulp.task('bundle-prod',
//   gulp.series(
//     gulp.parallel(
//       'css-bundle',
//       'js-bundle-prod',
//     ),
//   )
// );
//
//
//
// gulp.task('default', gulp.series('bundle-dev'));
//
//
// gulp.task('watch', gulp.series('default', function() {
//   gulp.watch('src/**/*.js', gulp.parallel('js-bundle-dev'));
//   gulp.watch('src/**/*.css', gulp.parallel('css-bundle'));
// }));
