interface Options {
  [x: string]: unknown;
  cfg: string;
  force?: boolean;
  dev?: boolean;
  devConfig?: Options;
  _?: string[];
}
