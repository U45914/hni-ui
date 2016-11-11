// webpack.config.js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

var order = {'css': 1, "libraries": 2, "app": 4, 'server': 5};

module.exports = {
    devtool: "cheap-eval-source-map",
    entry: {
        libraries: ['./index'],
        app: ['./app/index'],
        css: ['./app/assets/index'],
        server: ['webpack-dev-server/client?http://localhost:4000']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'http://localhost:4000/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './app/views/index.html',
            filename: '../index.html',
            chunksSortMode: function compareFunc(a,b) { return order[a.names[0]] - order[b.names[0]];}
        }),
        new DashboardPlugin(dashboard.setData)
    ],
    resolve: {
        modulesDirectories: ['./node_modules'],
        alias: {
            'npm': __dirname + '/node_modules',
            'images': __dirname + '/app/assets/images'
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css?sourceMap']
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap&sourceMapContents"]
        },
        {   test: /.(png|woff(2)?|eot|ttf|svg|png|jpg)(\?[a-z0-9=\.]+)?$/,
            loader: 'url-loader?limit=100000'
        },
        {
            test: /\.html$/,
            loaders: [
                "html?" + JSON.stringify({
                    attrs: ["ng-include:src", "img:src", "img:ng-src"]
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
    },
    devServer: {
        port: 4000,
        quiet: true
    }
};
