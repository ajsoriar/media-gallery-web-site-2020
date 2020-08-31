const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/dataSource/landing-data.json', to: '' },
        { from: './src/dataSource/landing-data.2.json', to: '' },
        { from: './src/static/empty.html', to: 'static/' },
        { from: './src/config_DEBUG.js', to: '' },
        { from: './src/config_SITE.js', to: '' }
      ],
      options: {
        concurrency: 100,
      },
    }),
    new HtmlWebPackPlugin({
      title: 'Media Gallery WEB Site 2020',
      hash: true,
      inject: 'body',
      template: './src/index.ejs',
      filename: "./index.html"
    })
  ]
};