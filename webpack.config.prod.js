// webpack.config.js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var order = {"libraries": 1, "app": 2};

module.exports = {
    devtool: "source-map",
    entry: {
        libraries: ['./index'],
        app: ['./app/index', './app/assets/index']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './app/views/index.html',
            filename: '../index.html',
            chunksSortMode: function compareFunc(a,b) { return order[a.names[0]] - order[b.names[0]];}
        }),
        new ExtractTextPlugin("[name].css")
    ],
    resolve: {
        modulesDirectories: ['./node_modules'],
        alias: {
            'npm': __dirname + '/node_modules'
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style", "css")
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', ["css?sourceMap", "postcss", "sass?sourceMap&sourceMapContents"])
        },
        {   test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
            loader: 'url-loader?limit=100000'
        },
        {
            test: /\.html$/,
            loaders: [
                "html?" + JSON.stringify({
                    attrs: ["ng-include:src"]
                })
            ]
        },
        {
            loader: "babel-loader",

            include: [
                path.resolve(__dirname, "app")
            ],

            test: /\.js?$/,

            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015']
            }
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './app/assets/scss')]
    },
    postcss: function () {
        return [autoprefixer];
    }
};