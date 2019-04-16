const path = require('path'), {sep} = path;

module.exports = {
    entry: {
        main: './src/public/js/index.ts'
    },
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, `${sep}app${sep}public${sep}js`)
    },
    resolve: {
        extensions: ['ts', 'js']
    },
    module: {
        rules: [
            {test: /\.ts$/, loaders: 'ts-loader'}
        ]
    }
}