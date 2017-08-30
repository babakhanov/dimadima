const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

module.exports = {
  context: __dirname + '/src',

  entry: {
    app: "./app"
  },

  output: {
    path: __dirname + "/docs",
    publicPath: process.env.NODE_ENV == 'production' ? 'https://babakhanov.github.io/dimadima/' : '/',
    filename: '[name]-[hash].js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [ /node_modules/ ],
      use: [{
        loader: 'babel-loader',
      }]
    },{
      test: /\.(eot|woff|woff2|ttf|svg|png|gif|jpg)$/,
      loader: 'file-loader?name=[path][name].[ext]'
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: false,
            }
          },{
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            }
          }
        ]
      })
    }]
  },

  resolve: {
    modules: ['node_modules', 'src']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "/dist"),
    hot: false,
    inline: false
  },


  plugins: [
    new ExtractTextPlugin("style-[hash].css"),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      excludeChunks: ['stubs']
    }),
  ]
};

