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
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
}

export default (env: EnvVariables): webpack.Configuration => {
  const paths: BuildPath = {
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    src: path.resolve(__dirname, 'src'),
  };

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001';
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002';

  const webpackConfig = buildWebpack({
    port: env.port ?? 5032,
    mode: env.mode ?? 'development',
    analyzer: env.analyzer,
    paths,
    platform: env.platform ?? 'desktop',
  });

  webpackConfig.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',

      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          // requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          // requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          // requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    })
  );

  return webpackConfig;
};
