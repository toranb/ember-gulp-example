var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');
var transpiler = require('gulp-es6-module-transpiler');

var paths = {
    templates: [
        'js/templates/**/*.handlebars'
    ],
    scripts: [
        'js/app/**/*.js'
    ],
    concatDist: [
        'js/vendor/jquery/jquery.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.js',
        'js/dist/tmpl.min.js',
        'vendor/loader.js',
        'vendor/ember-resolver.js',
        'js/dist/transpiled/app/**/*.js'
    ],
    concatTest: [
        'js/vendor/jquery/jquery.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.js',
        'js/vendor/jquery-mockjax/jquery.mockjax.js',
        'js/dist/tmpl.min.js',
        'vendor/loader.js',
        'vendor/ember-resolver.js',
        'js/dist/transpiled/app/**/*.js',
        'js/dist/transpiled/tests/**/*.js',
        'vendor/test-loader.js'
    ]
};

gulp.task('concat:dist', function(){
    return gulp.src(paths.concatDist)
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('concat:test', function(){
    return gulp.src(paths.concatTest)
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('transpile:app', function(){
    return gulp.src(paths.scripts)
        .pipe(transpiler({
            type: "amd",
            moduleName: "js/"
        }))
        .pipe(gulp.dest('js/dist/transpiled/app/'));
});

gulp.task('transpile:test', function(){
    return gulp.src(paths.scripts)
        .pipe(transpiler({
            type: "amd",
            moduleName: "js/tests/"
        }))
        .pipe(gulp.dest('js/dist/transpiled/tests/'));
});

gulp.task('emberhandlebars', function(){
    return gulp.src(paths.templates)
        .pipe(handlebars({outputType: 'browser'}))
        .pipe(concat('tmpl.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('local', ['transpile:app', 'emberhandlebars', 'concat:dist'])
gulp.task('test', ['transpile:app', 'transpile:test', 'emberhandlebars', 'concat:test'])
