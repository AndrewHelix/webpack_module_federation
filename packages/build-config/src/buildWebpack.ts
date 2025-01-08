import path from 'path';
import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  return {
    mode: options.mode,
    entry: options.paths.entry, //path to entry file
    devtool: isDev ? 'inline-source-map' : 'source-map', //helps find correct place of error, shows correct stacktrace, helps understand source code
    output: {
      path: options.paths.output, //path to output file
      filename: '[name].[contenthash].js',
      clean: true, //clean build folder before new build
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: isDev ? buildDevServer(options) : undefined,
  };
};
