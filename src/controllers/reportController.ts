import {
  NextFunction, Request, Response, Router,
} from 'express';
import Controller from '../interfaces/controller.interface';
import ReportInterface from '../interfaces/report.interface';
import ReportService from '../services/reportService';

class ReportController implements Controller {
  public path = '/report';

  public router = Router();

  private reportService = new ReportService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllReports);
    this.router.get(`${this.path}/:id`, this.getReportById);
    this.router.post(`${this.path}`, this.createReport);
    this.router.put(`${this.path}`, this.updateReport);
    this.router.delete(`${this.path}/:id`, this.deleteReportById);
  }

  private getReportById = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      if (id) {
        return response.status(200)
          .json(await this.reportService.getById(id));
      }
      return response.status(404);
    } catch (err) {
      return response.status(404);
    }
  };

  private getAllReports = async (request: Request, response: Response) => {
    try {
      return response.status(200)
        .json(await this.reportService.getAll());
    } catch (err) {
      return response.status(404)
        .json(err);
    }
  };

  private createReport = async (request: Request, response: Response) => {
    try {
      const newReport: ReportInterface = request.body;
      if (newReport) {
        try {
          response.status(201)
            .json(await this.reportService.create(newReport));
        } catch (err) {
          return response.status(404)
            .json(err);
        }
      }
      return response.status(404);
    } catch (err) {
      return response.status(404)
        .json(err);
    }
  };

  private updateReport = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newReport: ReportInterface = request.body;
      if (newReport) {
        try {
          response.status(201)
            .json(await this.reportService.update(newReport));
        } catch (err) {
          next(err.errors);
        }
      }
    } catch (err) {
      next(err.errors);
    }
  };

  private deleteReportById = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (id) {
      return response.status(204)
        .json(await this.reportService.delete(id));
    }
    return response.status(404);
  };
}

export default ReportController;
