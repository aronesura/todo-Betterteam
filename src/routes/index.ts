import { Application } from 'express';
import { RouteInterface } from './route.interface';
import TodoRoute from './todo.route';
import UploadRoute from './upload.route';

class Routes {
  private app;
  private routers: RouteInterface[];
  constructor(app: Application) {
    this.app = app;
    this.routers = [];
    this.initRouters();
    this.combineRouters();
  }

  private initRouters() {
    this.routers.push(new TodoRoute({ path: 'todos' }));
    this.routers.push(new UploadRoute({ path: 'upload' }));
  }

  public combineRouters(): void {
    this.routers.forEach((router) => this.app.use(`/api/${router.path}`, router.router));
  }
}

export default Routes;
