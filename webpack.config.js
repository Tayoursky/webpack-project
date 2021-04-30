const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
const filename = ext => isProd ? `[name].[contenthash].${ext}` : `[name].${ext}`

let mode = isProd ? 'production' : 'development'
let target = isProd ? 'browserslist' : 'web'

console.log('Is Dev? -', isDev)

module.exports = {
    mode: mode,
    target: target,
    entry: {
        main: ['@babel/polyfill', './src/index.js'],
        //type: ['@babel/polyfill', './src/ts/index.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[contenthash][ext][query]',
        filename: filename('js')
    },
    //context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            },
                        },
                    },
                    //'postcss-loader',
                    'sass-loader'
                ],
                sideEffects: true,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            /*{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },*/
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devtool: isDev ? "source-map" : false,
    devServer: {
        contentBase: "./dist",
        hot: true,
    }
}