import * as express from 'express';
import { connect } from 'mongoose';
import Controller from './interfaces/controller.interface';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    App.connectDatabase()
      .then(() => console.log('Database connected'))
      .catch((err) => console.log(err));
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(process.env.PORT || 5000, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private static async connectDatabase() {
    await connect(process.env.MONGODB_CONNECTION_STRING);
  }
}

export default App;
