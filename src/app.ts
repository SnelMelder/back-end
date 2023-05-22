import { connect } from 'mongoose';
import helmet from 'helmet';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import userMiddleware from './middlewares/user.middleware';

require('dotenv').config();
const cors = require('cors');
const express = require('express');

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(' ');

class App {
  public app = express();

  constructor(controllers: Controller[]) {
    this.app = express();
    App.connectDatabase()
      .then(() => console.log('Database connected'))
      .catch((err) => console.log(err));
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT || 5000, () => {
      console.log(`App listening on port ${process.env.PORT || 5000}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: allowedOrigins,
      }),
    );
    this.app.use(userMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public static async connectDatabase() {
    return connect(process.env.MONGODB_CONNECTION_STRING);
  }
}

export default App;
