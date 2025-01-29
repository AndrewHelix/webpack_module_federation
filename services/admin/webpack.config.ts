import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from '@packages/build-config';
import { BuildMode, BuildPath, BuildPlatform } from '@packages/build-config';
import packageJson from './package.json';

interface EnvVariables {
  mode: BuildMode;
  port: number;
  platform: BuildPlatform;
  analyzer?: boolean;
}

export default (env: EnvVariables): webpack.Configuration => {
  const paths: BuildPath = {
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    src: path.resolve(__dirname, 'src'),
  };

  const webpackConfig = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? 'development',
    analyzer: env.analyzer,
    paths,
    platform: env.platform ?? 'desktop',
  });

  webpackConfig.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/Router.tsx',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    })
  );

  return webpackConfig;
};
