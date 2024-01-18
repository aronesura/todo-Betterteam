import * as path from 'path';
import * as fs from 'fs';
import { Request, Response } from 'express';
import { ModelCtor } from 'sequelize';
import { v4 as uuid } from 'uuid';
import db from '../models';
import validatorFactory from '../utils/validator';
import { TodoAttributes, TodoInstance } from '../models/todo.model';
import { TodoCreateSchema, FindOneSchema, TodoUpdateSchema } from '../schemas/todo.schema';
import UploadService, { uploadFolderPath } from '../services/upload.service';

let model: ModelCtor<TodoInstance>;
let uploadService: UploadService;

class TodoController {
  constructor() {
    model = db['Todo'];
    uploadService = new UploadService();
  }

  public async create(req: Request, res: Response) {
    try {
      const uploadRes = await uploadService.singleImageUpload(req, res);

      const validator = validatorFactory<TodoAttributes>(TodoCreateSchema);
      const data = validator.verify(uploadRes.body as TodoAttributes);
      const newTodo = await model.create({ ...data, id: uuid(), image: uploadRes?.file.filename });

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
      const uploadRes = await uploadService.singleImageUpload(req, res);

      const bodyValidator = validatorFactory<TodoAttributes>(TodoUpdateSchema);
      const data = bodyValidator.verify(uploadRes.body as TodoAttributes);
      const paramsValidator = validatorFactory<{ id: string }>(FindOneSchema);
      const { id } = paramsValidator.verify(req.params as { id: string });

      // remove previous image
      const previousTodo = await model.findOne({ where: { id: id } });
      const imagePath = path.join(uploadFolderPath, previousTodo?.image || '');
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await model.update(
        { ...data, image: uploadRes?.file.filename },
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

      // remove previous image
      const previousTodo = await model.findOne({ where: { id: id } });
      const imagePath = path.join(uploadFolderPath, previousTodo?.image || '');
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await model.destroy({ where: { id: id } });

      return res.status(200).json({ message: `Task#${id} is deleted successfully.` });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default TodoController;
