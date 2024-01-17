import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDB } from './models';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.boostrap();
  }

  private async boostrap() {
    const result = dotenv.config();
    if (result.error) {
      throw new Error('dotenv config error');
    }

    // Connect DB
    await initDB();

    // Apply middlewares
    this.app.use(cors());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    this.app.use(bodyParser.json());

    this.app.get('/', async (req: Request, res: Response): Promise<Response> => {
      return res.status(200).send({
        message: 'Hello World!',
      });
    });
  }

  public start(): void {
    const port = process.env.PORT || 3000;

    this.app.listen(port, () => {
      console.log('Server listening on port: ' + port);
    });
  }
}

export default App;
