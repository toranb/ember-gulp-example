var gulp = require('gulp');
var karma = require('gulp-karma');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var gulpFilter = require('gulp-filter');
var handlebars = require('gulp-ember-handlebars');
var transpiler = require('gulp-es6-module-transpiler');

var paths = {
    jshint: [
        'js/app/**/*.js'
    ],
    templates: [
        'js/templates/**/*.handlebars'
    ],
    concatDist: [
        'js/vendor/jquery/dist/jquery.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.min.js',
        'js/vendor/ember-loader/loader.js',
        'js/vendor/ember-resolver/dist/ember-resolver.js',
        'js/dist/tmpl.min.js',
        'js/app/**/*.js'
    ],
    concatTest: [
        'js/vendor/jquery/dist/jquery.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.js',
        'js/vendor/fauxjax/dist/fauxjax.min.js',
        'js/vendor/ember-loader/loader.js',
        'js/vendor/ember-resolver/dist/ember-resolver.js',
        'js/dist/tmpl.min.js',
        'js/app/**/*.js',
        'js/tests/**/*.js',
        'vendor/test-loader.js'
    ]
};

var filterFunc = function(file) {
  var vendor = file.path.indexOf('vendor') === -1;
  var templates = file.path.indexOf('dist') === -1;
  return vendor && templates;
};

gulp.task('default', ['jshint', 'emberhandlebars'], function(){
    var filter = gulpFilter(function(file) {
        return filterFunc(file);
    });
    return gulp.src(paths.concatDist)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('test', ['jshint', 'emberhandlebars'], function(){
    var filter = gulpFilter(function(file) {
        return filterFunc(file);
    });
    return gulp.src(paths.concatTest)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'))
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

gulp.task('jshint', function() {
    return gulp.src(paths.jshint)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch(paths.concatDist, ['default']);
    gulp.watch(paths.templates, ['default']);
});
