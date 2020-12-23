module.exports = {
    entry: ['@babel/polyfill', './scripts/questao5/src/main.js'],
    output: {
        path: __dirname + '/scripts/questao5/public',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/scripts/questao5/public'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
};