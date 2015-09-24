var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['webpack-dev-server']);

gulp.task('build', ['css', 'html', 'webpack','font']);

gulp.task('build-dev', ['webpack:build-dev'], function (){
  gulp.watch(['app/**/*'], ['webpack:build-dev']);
});

gulp.task('webpack', function (callback){
  var config = Object.create(webpackConfig)
  config.entry = ['./src/index']
  webpack(config, function (err, stats){
    if(err) throw new gutil.PluginError('webpack', err)

    gutil.log('[webpack]', stats.toString({
      //output options
    }))
    callback()
  });
});

gulp.task('html', function (){
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
});

gulp.task('css', function (){
  return gulp.src(['./src/klarna.css', './node_modules/materialize-css/css/ghpages-materialize.css'])
    .pipe(gulp.dest('./build'))
});
gulp.task('font', function(){
    return gulp.src(['./node_modules/materialize-css/font/roboto/*'])
    .pipe(gulp.dest('./build/font/'))
})
gulp.task('css:dev', function (){
  return gulp.src(['./node_modules/materialize-css/css/ghpages-materialize.css'])
    .pipe(gulp.dest('./src'))
})

gulp.task('watch', ['html', 'webpack', 'css:dev'], function (){
  gulp.watch('./src/js/**/*', ['webpack-dev-server'])
  gulp.watch('./src/index.html', ['html'])
  gulp.watch('./src/shapes.css', ['css:dev'])
});
