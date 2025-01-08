import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import { buildBabelLoader } from './babel/buildBabelLoader';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              { name: 'convertColors', params: { currentColor: true } }, //allows use "color" in styles to change svg icon color
            ],
          },
        },
      },
    ], // icon: true allows work with svg like with icons and change sizes as expected
  };

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
      // also contains style-loader
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Creates `style` nodes from JS strings
      //'style-loader',
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/, //regexp file name or extensions which need to handle
    //ts-loader can handle JSX. if don't use ts-loader, bebel-loader should be used
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: isDev, //do not check types during building time
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: /node_modules/, //what should not be handled
  };

  const babelLoader = buildBabelLoader(options);

  return [
    //loaders array. order is important
    assetLoader,
    svgrLoader,
    scssLoader,
    tsLoader,
    // babelLoader,
  ];
};
