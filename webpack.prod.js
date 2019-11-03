const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const config = require('./webpack.base.js');

config.plugins.splice(0, 0, new CleanWebpackPlugin());
config.mode = 'production';
module.exports = config;