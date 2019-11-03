const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.js');
config.devServer = {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, './dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    port: 8082,
    overlay: true,
    inline: true
    // open: true
};
config.watchOptions = {
    poll: 1000,
    ignored: /node_modules/,
};
config.plugins.push(...[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
        'Promise': 'exports?global.Promise!es6-promise'
    })
]);
config.mode = 'development';
console.log('webdev is running on \x1B[36m%s\x1B[39m', 'http://' + config.devServer.host + ':' + config.devServer.port);
module.exports = config;