module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: '',
    colors: true,
    concurrency: Infinity,
    files: [
      {pattern: 'src/**/*.spec.js'}
    ],
    preprocessors: {
      'src/**/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        require('rollup-plugin-buble')(),
        require('rollup-plugin-istanbul')({
          exclude: ['src/**/*.spec.js']
        })
      ],
      output: {
        format: 'cjs',            // Helps prevent naming collisions.
        name: 'event-emitter-dom',    // Required for 'iife' format.
        sourcemap: 'inline'        // Sensible for testing.
      }
    },
    port: 9876,
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    thresholdReporter: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },
    reporters: ['spec', 'threshold', 'coverage'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-jasmine',
      'karma-threshold-reporter',
      'karma-rollup-preprocessor'
    ]
  })
}
