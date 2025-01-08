import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from '@packages/build-config';
import { BuildMode, BuildPath, BuildPlatform } from '@packages/build-config';

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
    port: env.port ?? 5032,
    mode: env.mode ?? 'development',
    analyzer: env.analyzer,
    paths,
    platform: env.platform ?? 'desktop',
  });
  return webpackConfig;
};
