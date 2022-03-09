export interface IHandleFile {
  dir: string;
}

export interface IImageResizeRepository {
  find(filename?: string): Promise<IHandleFile>;
}
