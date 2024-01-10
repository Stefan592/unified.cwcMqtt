const path = require('path');

module.exports = {
    plugins: [],
    entry: './src/js/main.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/control/js'),
    },
    optimization: {
        minimize: false
    },
    devtool: 'source-map'
};