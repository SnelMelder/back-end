import { Request, Response, Router } from 'express';
import {
  Route, Tags,
} from 'tsoa';
import Controller from '../interfaces/controller.interface';

@Route('HelloWorld')
@Tags('HelloWorldController')
const passport = require('passport');

class DefaultController implements Controller {
  public path = '/';

  public router = Router();

  private helloWorld = 'Hello SnelMelder';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, passport.authenticate('jwt', { session: false }), this.status);
  }

  private status = async (request: Request, response: Response) => {
    response.status(200).json(this.helloWorld);
  };
}

export default DefaultController;
