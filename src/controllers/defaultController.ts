import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';

class DefaultController implements Controller {
  public path = '/';

  public router = Router();

  private helloWorld = 'Hello SnelMelder';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.status);
  }

  private status = async (request: Request, response: Response) => {
    response.status(200).json(this.helloWorld);
  };
}

export default DefaultController;
