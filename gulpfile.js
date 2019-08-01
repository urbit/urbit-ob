// A task runner that helps automate development tasks
var gulp = require('gulp');
// A module bundler for JS which compiles small pieces of code into something larger and more complex
var rollup = require('gulp-better-rollup');
// A fast, economical JS transpiler. Takes JS like ES6/7 and transforms it to JS that is consumable by a conventional JS runtime. It is like Babel but faster and less extensible.
var sucrase = require('@sucrase/gulp-plugin');
// Like sucrase, this is a transpiler. It has more features. We occasionally use it because Sucrase does not support the object rest/spread language feature but babel does.
// var babel = require("rollup-plugin-babel");
// allows importing libraries node_modules without specifying path eg "import x from '/node_modules/react'" -> "import x from 'react'"
var resolve = require('rollup-plugin-node-resolve');
// Parses commonjs-style "require" statements as imported modules. Pretty standard dependency required for most NPM-sourced dependencies
var commonjs = require('rollup-plugin-commonjs');
// Replace particular strings with other things
var replace = require('rollup-plugin-replace');
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
