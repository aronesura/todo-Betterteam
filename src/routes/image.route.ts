import { Router } from 'express';
import { ImageController } from '../controllers';
import { RouteConstructorInterface } from './route.interface';

class ImageRoute {
  public path: string;
  public router = Router();
  private uploadController;

  constructor({ path }: RouteConstructorInterface) {
    this.uploadController = new ImageController();
    this.path = path;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post('/', this.uploadController.upload);
    this.router.get('/', this.uploadController.getOne);
    this.router.get('/base64', this.uploadController.getOneBase64);
  }
}
export default ImageRoute;
