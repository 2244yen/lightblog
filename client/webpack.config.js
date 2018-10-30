const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DIST_PATH = path.resolve(__dirname, '/dist');
const MODE = process.env.WEBPACK_MODE;

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.js'
  ],
  output: {
    path: DIST_PATH,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },{
        test: /\.(sa|sc|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { minimize: true } }, 'sass-loader']
        })
      },{
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Light Blog',
      inject: true,
      template: './public/index.html',
      hash: true,
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': JSON.stringify(MODE === 'development' ? 'development' : 'production') 
    }), 
    new webpack.HotModuleReplacementPlugin()
  ]
}

// if (MODE === 'development') {
// }
config.devtool = 'inline-source-map'
config.devServer = {
  historyApiFallback: true,
  publicPath: '/',
  hot: true,
  inline: true,
  port: 3000
}
  
module.exports = config;