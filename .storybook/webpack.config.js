const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const context = path.resolve(__dirname, '../src');

module.exports = {
  context,
  module: {
    loaders: [
      process.env.NODE_ENV === 'build' ?
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css?modules!less'),
        include: [
          path.resolve(__dirname, '../less')
        ]
      }
    :
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: ['style', 'css-loader?modules&localIdentName=[local]___[hash:base64:5]', 'less'],
        include: [
          path.resolve(__dirname, '../stories'),
          path.resolve(__dirname, '../less')
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
    library: 'shared-components',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: [
      'src',
      'less',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};
