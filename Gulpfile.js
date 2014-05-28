var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var karma = require('gulp-karma');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var handlebars = require('gulp-ember-handlebars');
var transpiler = require('gulp-es6-module-transpiler');

var paths = {
    templates: [
        'js/templates/**/*.handlebars'
    ],
    concatDist: [
        'js/vendor/jquery/jquery.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.min.js',
        'js/vendor/ember-loader/loader.js',
        'vendor/ember-resolver.js',
        'js/dist/tmpl.min.js',
        'js/app/**/*.js'
    ],
    concatTest: [
        'js/vendor/jquery/jquery.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.js',
        'js/vendor/ember-loader/loader.js',
        'vendor/ember-resolver.js',
        'js/dist/tmpl.min.js',
        'js/app/**/*.js',
        'js/tests/**/*.js'
    ]
};

var filter = gulpFilter(function(file) {
  return file.path.indexOf('vendor') === -1;
});

gulp.task('concat:dist', function(){
    return gulp.src(paths.concatDist)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('concat:test', function(){
    return gulp.src(paths.concatTest)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('karma', function(){
    return gulp.src('js/dist/deps.min.js')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }));
});

gulp.task('emberhandlebars', function(){
    return gulp.src(paths.templates)
        .pipe(handlebars({outputType: 'browser'}))
        .pipe(concat('tmpl.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('default', ['emberhandlebars', 'concat:dist'])
gulp.task('test', ['emberhandlebars', 'concat:test', 'karma'])
