import { Application } from 'express';
import { RouteInterface } from './route.interface';
import TodoRoute from './todo.route';
import ImageRoute from './image.route';

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
    this.routers.push(new ImageRoute({ path: 'image' }));
  }

  public combineRouters(): void {
    this.routers.forEach((router) => this.app.use(`/api/${router.path}`, router.router));
  }
}

export default Routes;
