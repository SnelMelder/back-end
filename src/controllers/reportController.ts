import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import ReportInterface from '../interfaces/report.interface';
import ReportService from '../services/reportService';

class ReportController implements Controller {
  public path = '/reports';

  public router = Router();

  private reportService = new ReportService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.createReport);
  }

  private createReport = async (request: Request, response: Response) => {
    try {
      const newReport: ReportInterface = request.body;
      if (newReport) {
        try {
          return response
            .status(201)
            .json(
              await this.reportService.create(newReport, response.locals.user),
            );
        } catch (err) {
          return response.status(404).json(err.errors);
        }
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };
}

export default ReportController;
