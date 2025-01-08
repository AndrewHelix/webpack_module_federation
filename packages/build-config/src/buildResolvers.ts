import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export const buildResolvers = (
  options: BuildOptions
): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'], //extensions need to handle. order is important
    alias: {
      '@': options.paths.src,
    },
  };
};
