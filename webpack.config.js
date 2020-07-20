//webpack.config.js

module.exports = {
    mode: 'development',
    entry: [
        './app/main.js',
        './app/ProgressBar.js'
    ],
    output: {
        filename: 'bundle.js'
    }
};