module.exports = function(config) {
    config.set({
        files: [
            { pattern: 'src/**/*.spec.js' }
        ],
        preprocessors: {
            'src/**/*.spec.js': ['rollup']
        },
        rollupPreprocessor: {
            plugins: [require('rollup-plugin-buble')()],
            output: {
                format: 'cjs',            // Helps prevent naming collisions.
                name: 'event-emitter-dom',    // Required for 'iife' format.
                sourcemap: 'inline'        // Sensible for testing.
            }
        },
        frameworks: ['jasmine'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            // 'karma-spec-reporter',
            // 'karma-coverage',
            'karma-jasmine',
            // 'karma-threshold-reporter',
            'karma-rollup-preprocessor'
        ],
    })
};
