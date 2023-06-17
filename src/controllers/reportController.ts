import { Request, Response, Router } from 'express';
import {
  checkJwt,
  requiredScopes,
  scopes,
} from '../middlewares/auth.middleware';
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
    this.router.post(
      `${this.path}`,
      checkJwt,
      requiredScopes(scopes.reports.create),
      this.createReport,
    );
  }

  private createReport = async (request: Request, response: Response) => {
    // console.log(response);

    try {
      const newReport: ReportInterface = request.body;

      if (newReport) {
        console.log('New report...');
        try {
          return response
            .status(201)
            .json(
              await this.reportService.create(newReport, response.locals.user),
            );
        } catch (err) {
          console.log(err);
          return response.status(500).json(err.errors);
        }
      }
      return response.status(500);
    } catch (err) {
      return response.status(500).json(err.errors);
    }
  };
}

export default ReportController;
