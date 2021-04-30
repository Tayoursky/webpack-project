const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
let mode = isProd ? 'production' : 'development'
let target = isProd ? 'browserslist' : 'web'

const isDev = mode === 'development'

console.log('Is Dev? -', isDev)

module.exports = {
    mode: mode,
    target: target,
    //context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
    devtool: isDev ? "source-map" : false,
    devServer: {
        contentBase: "./dist",
        hot: true,
    }
}