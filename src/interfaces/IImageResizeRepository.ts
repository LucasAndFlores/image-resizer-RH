export interface IHandleFile {
  path: string;
}

export interface IImageResizeRepository {
  find(filename?: string): Promise<IHandleFile>;
}
