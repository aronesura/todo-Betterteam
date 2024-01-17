import { Request, Response } from 'express';
import { ModelCtor } from 'sequelize';
import { v4 as uuid } from 'uuid';
import db from '../models';
import validatorFactory from '../utils/validator';
import { TodoAttributes, TodoInstance } from '../models/todo.model';
import { TodoSchema, FindOneSchema } from '../schemas/todo.schema';

let model: ModelCtor<TodoInstance>;

class TodoController {
  constructor() {
    model = db['Todo'];
  }

  public async create(req: Request, res: Response) {
    try {
      const validator = validatorFactory<TodoAttributes>(TodoSchema);
      const data = validator.verify(req.body);
      const newTodo = await model.create({ ...data, id: uuid() });

      return res
        .status(201)
        .json({ data: newTodo, message: `Task#${newTodo.id} is created successfully.` });
    } catch (error) {
      // @ts-ignore
      if (error?.validationErrors?.length) {
        return (
          res
            .status(400)
            // @ts-ignore
            .json({ name: error?.name, errors: error.validationErrors })
        );
      }
      return res.status(500).json(error);
    }
  }

  public async updateOne(req: Request, res: Response) {
    try {
      const bodyValidator = validatorFactory<TodoAttributes>(TodoSchema);
      const data = bodyValidator.verify(req.body);
      const paramsValidator = validatorFactory<{ id: string }>(FindOneSchema);
      const { id } = paramsValidator.verify(req.params as { id: string });

      await model.update(
        { ...data },
        {
          where: {
            id,
          },
        },
      );

      const updatedTodo = await model.findOne({ where: { id: id } });

      return res
        .status(201)
        .json({ data: updatedTodo, message: `Task#${id} is updated successfully.` });
    } catch (error) {
      // @ts-ignore
      if (error?.validationErrors?.length) {
        return (
          res
            .status(400)
            // @ts-ignore
            .json({ name: error?.name, errors: error.validationErrors })
        );
      }
      return res.status(500).json(error);
    }
  }

  public async findAll(req: Request, res: Response) {
    try {
      const todos = await model.findAll();

      return res.status(200).json({ data: todos });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async findOneById(req: Request, res: Response) {
    try {
      const validator = validatorFactory<{ id: string }>(FindOneSchema);
      const { id } = validator.verify(req.params as { id: string });

      const todo = await model.findOne({ where: { id: id } });

      return res.status(200).json({ data: todo });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async deleteOneById(req: Request, res: Response) {
    try {
      const validator = validatorFactory<{ id: string }>(FindOneSchema);
      const { id } = validator.verify(req.params as { id: string });

      await model.destroy({ where: { id: id } });

      return res.status(200).json({ message: `Task#${id} is deleted successfully.` });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default TodoController;
