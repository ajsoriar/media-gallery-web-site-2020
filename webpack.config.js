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
            options: {
              outputPath: 'images',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/data/', to: 'data' },
        { from: './src/static/empty.html', to: 'static' },
        { from: './src/config/config_DEBUG.js', to: '' },
        { from: './src/config/config_SITE.js', to: '' },
        { from: './src/custom.css', to: '' },
        { from: './src/assets/images/brand/', to: 'images/brand/' }
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