import * as path from 'path';
import * as fs from 'fs';
import { Request, Response } from 'express';
import ImageService from '../services/image.service';
import validatorFactory from '../utils/validator';
import { DownloadSchema } from '../schemas/upload.schema';

let imageService: ImageService;

class ImageController {
  constructor() {
    imageService = new ImageService();
  }

  public async upload(req: Request, res: Response) {
    try {
      const data = await imageService.singleImageUpload(req, res);

      return res.status(data.file ? 201 : 400).json({
        data: data.file,
        message: data.file ? 'Image uploaded successfully.' : 'Please provide image to upload',
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const validator = validatorFactory<{ image: string; action: string }>(DownloadSchema);
      const { image, action } = validator.verify(req.query as { image: string; action: string });

      const filePath = path.resolve(__dirname, '../../public/uploads', image);

      if (action === 'view') {
        return res.sendFile(filePath);
      } else {
        return res.download(filePath);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async getOneBase64(req: Request, res: Response) {
    try {
      const validator = validatorFactory<{ image: string }>(DownloadSchema);
      const { image } = validator.verify(req.query as { image: string });

      const filePath = path.resolve(__dirname, '../../public/uploads', image);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Image not found.' });
      }

      const imageBuffer = fs.readFileSync(filePath);
      const base64Data = imageBuffer.toString('base64');

      return res.status(201).json({ data: base64Data });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ImageController;
