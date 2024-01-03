export interface FileDto {
  _id: string;
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
}
export interface UpdateFileDto {
  originalname?: string;
}
export interface CreateFileDto {
  file: File;
  originalname: string;
}
