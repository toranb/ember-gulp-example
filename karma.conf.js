module.exports = function(karma) {
    karma.set({
        basePath: '',
        files: [
          "js/dist/**/*.js"
        ],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        reporters: ['progress'],
        logLevel: karma.LOG_ERROR,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,
        frameworks: ['qunit', 'qunit-sb']
    });
};
