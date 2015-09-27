var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

gulp.task('default', ['webpack-dev-server']);

gulp.task('build', ['css', 'html', 'font', 'jsmin']);

gulp.task('build-dev', ['webpack:build-dev'], function (){
  gulp.watch(['app/**/*'], ['webpack:build-dev']);
});

gulp.task('jsmin', ['webpack'], function(){
  return gulp.src('./build/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build'))
})

gulp.task('webpack', function (callback){
  var config = Object.create(webpackConfig)
  config.entry = ['./src/index']
  config.loaders = ['babel?stage=1']
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
  return gulp.src(['./src/css/klarna.css', './node_modules/materialize-css/css/ghpages-materialize.css'])
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('./build/css'))
});
gulp.task('css:dev', function(){
  return gulp.src('./src/klarna.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('./src/css'))
})
gulp.task('font', function(){
    return gulp.src(['./node_modules/materialize-css/font/roboto/*'])
    .pipe(gulp.dest('./build/font/roboto/'))
})
gulp.task('font:dev', function(){
  return gulp.src(['./node_modules/materialize-css/font/roboto/*'])
    .pipe(gulp.dest('./src/font/roboto/'))
})
gulp.task('static:dev', function (){
  return gulp.src(['./node_modules/materialize-css/css/ghpages-materialize.css'])
    .pipe(gulp.dest('./src'))
})

gulp.task('watch', ['html', 'webpack', 'static:dev', 'css:dev','font:dev'], function (){
  gulp.watch('./src/js/**/*', ['webpack-dev-server'])
  gulp.watch('./src/index.html', ['html'])
  gulp.watch('./src/**/*.css', ['css:dev'])
});
