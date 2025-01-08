import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { BuildOptions } from './types/types';
import path from 'path';

export const buildPlugins = (
  options: BuildOptions
): webpack.Configuration['plugins'] => {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  const plugins: webpack.Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths.html, //entry point of html file
      favicon: path.resolve(options.paths.public, 'favicon.svg'),
    }),
    new DefinePlugin({
      __PLATFORM: JSON.stringify(options.platform),
      __MODE: JSON.stringify(options.mode),
    }), //replaces variables in your code with other values or expressions at compile time
  ];

  if (isDev) {
    plugins.push(
      new webpack.ProgressPlugin() //shows % or progress during building, but makes building slower
    );
    plugins
      .push
      // new ForkTsCheckerWebpackPlugin() //check types during building time in parallel process
      ();
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
      }) //extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
    );
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(options.paths.public, 'locales'),
            to: path.resolve(options.paths.output, 'locales'),
          },
        ],
      })
    );
  }

  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
