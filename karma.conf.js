module.exports = function(karma) {
    karma.set({
        basePath: 'js',
        files: [
          "dist/deps.min.js"
        ],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        reporters: ['progress'],
        logLevel: karma.LOG_ERROR,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,
        frameworks: ['qunit', 'qunit-sb'],
    });
};
