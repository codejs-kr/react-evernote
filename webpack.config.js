// webpack.config.js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, 'components');
var BUILD_DIR  = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:7000',
    'webpack/hot/dev-server',
    APP_DIR + '/index.jsx'    // file extension after index
  ],
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  },
  devServer: {
    contentBase: './src',
    hot: true
  },
  watch: true
};
