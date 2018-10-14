const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getAbsPath, srcPath, publicPath, distPath } = require('./path');

module.exports = {
  entry: srcPath,

  output: {
    filename: 'main.[hash].js'
  },

  // 상대 경로 보완
  resolve: {
    alias: {
      components: srcPath + '/components',
      containers: srcPath + '/containers',
      contents: srcPath + '/contents'
    }
  },

  devtool: 'source-map',

  devServer: {
    contentBase: [
      publicPath,
      srcPath
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // includePaths: [srcPath + '/contents/scss/modules']  // component SCSS 내부에서 import시 사용하는 path설정.
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // outputPath: 'contents/img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distPath], {
      root: getAbsPath()
    }),
    new CopyWebpackPlugin([
      {
        from: srcPath + '/contents/img',
        to: distPath + '/contents/img'
      }
    ]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    })
  ]
};