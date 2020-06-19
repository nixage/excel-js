/* eslint-disable max-len */
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizationCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [
      new OptimizationCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

const jsLoaders = () => {
  const loader = ['babel-loader'];

  if (isDev) {
    loader.push('eslint-loader');
  }

  return loader;
};

const entryConf = () => {
  if (isDev) {
    return {
      main: ['@babel/polyfill', './index.js'],
      unshift: 'webpack-dev-server/client?http://localhost:4200/'
    }
  }
  return {
    main: ['@babel/polyfill', './index.js'],
  }
}

const outputConf = () => {
  if (isDev) {
    return {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: '/'
    }
  }
  return {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  }
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devServer: {
    port: 4200,
    hot: isDev,
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/img'),
      '@fonts': path.resolve(__dirname, 'src/fonts'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@redux': path.resolve(__dirname, 'src/core/redux'),
    },
  },
  optimization: optimization(),
  entry: entryConf(),
  output: outputConf(),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
              sourceMap: true,

            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ],
};
