import * as path from 'path';
import multer from 'multer';
import { Request, Response } from 'express';

export type UploadedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export const uploadFolderPath = path.resolve(__dirname, '../..', 'public/uploads');

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: uploadFolderPath,
  filename(
    req: Express.Request,
    file: Express.Multer.File,
    fn: (error: Error | null, filename: string) => void,
  ): void {
    fn(null, `${new Date().getTime().toString()}${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({
  storage: storageFile,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension: boolean =
      ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType: boolean = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;

    if (extension && mimeType) {
      return callback(null, true);
    }

    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
}).single('image');

class UploadService {
  constructor() {}

  public singleImageUpload = async (
    req: Request,
    res: Response,
  ): Promise<{ file: UploadedFile; body: object }> => {
    return new Promise((resolve, reject): void => {
      uploadFile(req, res, (error) => {
        if (error) {
          reject(error);
        }

        resolve({ file: req.file as UploadedFile, body: req.body });
      });
    });
  };
}

export default UploadService;
