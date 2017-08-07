var path = require('path');

module.exports = {
  entry: './babylon/client/js/loader.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'babylon/client/dist')
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
  extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015']
      }
    }]
  }
};

