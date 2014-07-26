module.exports = function(karma) {
    karma.set({
        basePath: '',
        files: [
          "js/dist/deps.min.js"
        ],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        reporters: ['progress', 'coverage'],
        logLevel: karma.LOG_ERROR,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,
        frameworks: ['qunit'],
        preprocessors:{
            "js/dist/deps.min.js": "coverage"
        },
        coverageReporter: {
            type: "text",
            dir: "coverage/"
        },
        plugins: [
            "karma-coverage",
            "karma-qunit",
            "karma-phantomjs-launcher"
        ]
    });
};
