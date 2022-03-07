import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import reportModel from '../models/report';

class DefaultController implements Controller {
  public path = '/report';

  public router = Router();

  private report = reportModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllReports);
  }

  private getAllReports = async (request: Request, response: Response) => {
    try {
      response.status(200).json(this.report.find());
    } catch (err) {
      response.status(404).json(err);
    }
  };
}

export default DefaultController;
