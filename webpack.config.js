const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    // wren: ['babel-polyfill', './index.js'],
    wren: './index.js',
    twod: './previews/twod.js',
    dom: './previews/dom.js',
    dev: './previews/dev.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/js/'),
    publicPath: '/js/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }]
      }
    ]
  },
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'disabled'
  })]
}
