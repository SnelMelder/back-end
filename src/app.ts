import { connect } from 'mongoose';
import helmet from 'helmet';
import Controller from './interfaces/controller.interface';
import Config from './config/config';
import errorMiddleware from './middlewares/error.middleware';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const cors = require('cors');
const express = require('express');

class App {
  public app = express();

  private readonly config = new Config();


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
      console.log(`App listening on the port ${process.env.PORT || 5000}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors({
      origin: ['http://localhost:5000'],
    }));
    this.app.use(passport.initialize());
    passport.use(new JwtStrategy(this.config.jwtOptions, this.config.verify));
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
