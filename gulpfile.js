const gulp = require('gulp');
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const through = require('through2');
const log = require('gulp-util').log;
const colors = require('gulp-util').colors;
const relative = require('path').relative;
const rollup = require('rollup').rollup;
const rollupBabel = require('rollup-plugin-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const postcss = require('postcss');
const pify = require('pify');
const readFile = pify(require('fs').readFile);
const writeFile = pify(require('fs').writeFile);
const meta = require('./package.json');

const babelConfigs = {
  lib: {
    presets: ['es2015', 'react']
  },
  dist: {
    presets: [
      ['es2015', { modules: false }],
      'react',
    ],
    plugins: [
      'external-helpers',
      'transform-react-constant-elements',
      'transform-react-remove-prop-types',
    ],
  },
};

const src = 'src/**/*.js';
const dest = 'lib/';

const cssMain = './src/index.css';
const cssDest = './lib/all.css';

gulp.task('default', ['build', 'css', 'dist']);

gulp.task('rollup', () =>
  rollup({
    entry: './src/index.js',
    plugins: [rollupBabel(babelConfigs.dist)],
    external: Object.keys(meta.dependencies).concat(meta.peerDependencies),
  }).then(bundle => bundle.write({
    format: 'cjs',
    exports: 'named',
    dest: 'lib/rollup.js',
  }))
);

gulp.task('dist', ['rollup'], () =>
  gulp.src('./lib/rollup.js')
    .pipe(uglify({
      compress: {
        screw_ie8: true,
        pure_getters: true,
        unsafe: true
      },
      output: { screw_ie8: true },
      mangle: { toplevel: true },
    }))
    .pipe(rename('rollup.min.js'))
    .pipe(gulp.dest('./lib/'))
)

gulp.task('build', () =>
  gulp.src(src)
    .pipe(plumber())
    .pipe(newer(dest))
    .pipe(through.obj((file, enc, cb) => {
      const path = relative(__dirname, file.path);
      log(`Compiling '${colors.cyan(path)}'...`);
      cb(null, file);
    }))
    .pipe(babel(babelConfigs.lib))
    .pipe(gulp.dest(dest))
);

gulp.task('css', () =>
  readFile(cssMain, 'utf8').then(css =>
    postcss([
      require('postcss-import'),
      require('postcss-nested'),
      require('cssnano')
    ]).process(
      css,
      { from: cssMain, to: cssDest }
    )
  ).then(result =>
    writeFile(cssDest, result.css)
  )
)

gulp.task('watch', ['build'], () =>
  watch(src, () => {
    gulp.start('build');
  })
);
