import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true, //use it when using HTML5 History API. to use react-router-dom, avoid 404 error for routes
    // static: './dist',
    hot: true, //HMR allow update smth on the page without page reload, it is not enough with React, enough with vanilla js
  };
};
