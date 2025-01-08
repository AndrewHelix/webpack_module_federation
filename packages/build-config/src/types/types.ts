export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildPath {
  entry: string;
  html: string;
  public: string;
  output: string;
  src: string;
}

export interface BuildOptions {
  port: number;
  paths: BuildPath;
  mode: BuildMode;
  platform: BuildPlatform;
  analyzer?: boolean;
}
