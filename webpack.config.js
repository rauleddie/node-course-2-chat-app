const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        main: path.join(__dirname, 'src', 'public', 'js', 'chat.ts')
    },
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'app', 'public', 'js')
    },
    resolve: {
        extensions: ['ts', 'js']
    },
    module: {
        rules: [
            {test: /\.ts$/, loaders: 'ts-loader'}
        ]
    },
    plugins: [
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
}