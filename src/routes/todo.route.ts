import { Router } from 'express';
import { TodoController } from '../controllers';
import { RouteConstructorInterface } from './route.interface';

class TodoRoute {
  public path: string;
  public router = Router();
  private todoController;

  constructor({ path }: RouteConstructorInterface) {
    this.todoController = new TodoController();
    this.path = path;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/', this.todoController.findAll);
    this.router.post('/', this.todoController.create);
    this.router.get('/:id', this.todoController.findOneById);
    this.router.put('/:id', this.todoController.updateOne);
    this.router.delete('/:id', this.todoController.deleteOneById);
  }
}

export default TodoRoute;
