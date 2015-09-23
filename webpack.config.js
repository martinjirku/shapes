var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: "./src",
    noInfo: true, //  --no-info option
    hot: false,
    inline: true,
    historyApiFallback: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      loaders: ['react-hot', 'babel?stage=0'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
