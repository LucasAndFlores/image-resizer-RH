declare namespace Express {
  export interface Request {
    cacheFile?: {
      dirPath: string;
    };
  }
}
