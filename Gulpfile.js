var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

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
        'js/vendor/jquery-mockjax/jquery.mockjax.js',
        'js/vendor/ember-loader/loader.js',
        'vendor/ember-resolver.js',
        'js/dist/tmpl.min.js',
        'js/app/**/*.js',
        'js/tests/**/*.js',
        'vendor/test-loader.js'
    ]
};

var filter = plugins.filter(function(file) {
  var vendor = file.path.indexOf('vendor') === -1;
  var templates = file.path.indexOf('dist') === -1;
  return vendor && templates;
});

gulp.task('default', ['emberhandlebars'], function(){
    return gulp.src(paths.concatDist)
        .pipe(filter)
        .pipe(plugins.es6ModuleTranspiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(plugins.concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('test', ['emberhandlebars'], function(){
    return gulp.src(paths.concatTest)
        .pipe(filter)
        .pipe(plugins.es6ModuleTranspiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(plugins.concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'))
        .pipe(plugins.karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }));
});

gulp.task('emberhandlebars', function(){
    return gulp.src(paths.templates)
        .pipe(plugins.emberHandlebars({outputType: 'browser'}))
        .pipe(plugins.concat('tmpl.min.js'))
        .pipe(gulp.dest('js/dist/'));
});
