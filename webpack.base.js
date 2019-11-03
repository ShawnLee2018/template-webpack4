const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const format = require('date-fns/format');
const packageInfo = require('./package.json');


const fs = require("fs")
const gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim()
const ref = gitHEAD.split(': ')[1]
const develop = gitHEAD.split('/')[2]
const gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim()
const gitCommitVersion = '"' + develop + ': ' + gitVersion.substr(0, 6) + '"'

module.exports = {
    entry: {
        app: ['./app/js/index.js', './app/css/index.less']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '',
    },
    target: 'web',
    optimization: {
        namedChunks: true,
        splitChunks: {
            minSize: 30000,
            cacheGroups: {
                commons: {
                    chunks: 'initial', // 'initial', 'async', 'all'
                    name: 'commons',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 0,
                },
                vendor: {
                    chunks: 'initial', // 'initial', 'async', 'all'
                    test: /node_modules/,
                    name: 'vendor',
                    priority: -10,
                    enforce: true,
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, 'app'),
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            loose: true,
                            modules: false,

                        }]
                    ],
                    plugins: ['@babel/plugin-transform-runtime']
                },
            },

            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                    }
                ]
            },
            {

                test: /\.(png|gif|jpg|svg|jpeg|ttf)$/i,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'assets/[name].[ext]',
                    publicPath: '../'
                }

            }

        ],

    },
    plugins: [
        new webpack.DefinePlugin({
            PACKAGE_NAME: JSON.stringify(packageInfo.name),
            BUILD_VERSION: gitCommitVersion,
            BUILD_TIME: JSON.stringify(format(new Date(), "YYYY-M-D H:mm:ss")),
        }),
        new CopyWebpackPlugin([{
                from: __dirname + '/public',
                to: __dirname + '/dist',
            },

        ]),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            chunkFilename: '[name].less'
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './app/template/index.tmp.html',
            inject: 'head',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }

        }),
        new webpack.ProvidePlugin({
            'Promise': 'exports?global.Promise!es6-promise'
        })
    ]
};