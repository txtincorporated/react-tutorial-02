// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    path: './public/build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './views/layouts/main.handlebars'
  //   }),
  //   new CopyWebPackPlugin([{
  //     from: ''
  //   }])
  // ]
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /'node_modules'/,
      loader: 'babel-loader'
    }, {
      test: /\.handlebars$/,
      loader: 'handlebars-loader',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      exclude: /node_modules/ 
    }]
  }
};
