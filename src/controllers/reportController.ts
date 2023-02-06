import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import ReportInterface from '../interfaces/report.interface';
import ReportService from '../services/reportService';

const multer = require('multer');
const fs = require('fs');

class ReportController implements Controller {
  public path = '/reports';

  public router = Router();

  private reportService = new ReportService();

  public upload_middleware = multer({ dest: './tmp/uploads/' });

  public imagePath = 'images/';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllReports);
    this.router.get(`${this.path}/:id`, this.getReportById);
    this.router.get(
      `${this.path}/lastReport/:id`,
      this.getReportByUserAndStatus,
    );
    this.router.get(
      `${this.path}/getbylocation/:locationId`,
      this.getReportsByLocation,
    );
    this.router.post(`${this.path}`, this.createReport);
    this.router.put(`${this.path}`, this.updateReport);
    this.router.post(
      `${this.path}/:id/picture`,
      this.upload_middleware.any('images'),
      this.uploadPicture,
    );
    this.router.delete(`${this.path}/:id`, this.deleteReportById);
  }

  private getReportByUserAndStatus = async (
    request: Request,
    response: Response,
  ) => {
    const { id } = request.params;
    try {
      if (id) {
        return response
          .status(200)
          .json(await this.reportService.getReportByUserAndStatus(id));
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private getReportById = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      if (id) {
        return response.status(200).json(await this.reportService.getById(id));
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private getReportsByLocation = async (
    request: Request,
    response: Response,
  ) => {
    const { locationId } = request.params;
    try {
      if (locationId) {
        return response
          .status(200)
          .json(await this.reportService.getByLocationId(locationId));
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private getAllReports = async (request: Request, response: Response) => {
    try {
      return response.status(200).json(await this.reportService.getAll());
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private createReport = async (request: Request, response: Response) => {
    try {
      const newReport: ReportInterface = request.body;
      if (newReport) {
        try {
          response
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

  private updateReport = async (request: Request, response: Response) => {
    try {
      const newReport: ReportInterface = request.body;
      if (newReport) {
        try {
          response.status(201).json(await this.reportService.update(newReport));
        } catch (err) {
          return response.status(404).json(err.errors);
        }
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private uploadPicture = async (request: Request, response: Response) => {
    const { id } = request.params;
    let imagePaths: { error: Array<Error>; paths: Array<string> };
    if (typeof request.files !== 'undefined') {
      imagePaths = this.checkAndMove(request.files);
    } else {
      return response.status(404).json('Invalid use of endpoint');
    }

    if (imagePaths.error.length !== 0) {
      imagePaths.error.forEach((error) => {
        console.log(error);
      });
      return response
        .status(400)
        .json('Something went wrong handling your request');
    }

    if (id) {
      try {
        return response
          .status(201)
          .json(await this.reportService.upload(id, imagePaths.paths));
      } catch (err) {
        return response.status(400).json(err.errors);
      }
    }
    return response.status(404);
  };

  private checkAndMove = (
    files: any,
  ): { error: Array<Error>; paths: Array<string> } => {
    const paths: Array<string> = [];
    const error: Array<Error> = [];

    files.forEach((file: any) => {
      const mimetype = file.mimetype.split('/');
      if (mimetype[0] === 'image') {
        const filename: string = `${file.filename}.${
          file.mimetype.split('/')[1]
        }`;
        const newPath: string = `${this.imagePath}${filename}`;
        paths.push(newPath);

        fs.rename(file.path, newPath, (err: Error) => {
          if (err) {
            error[error.length] = {
              name: 'rename',
              message: `Failed to rename: ${err}`,
            };
          }
        });
      } else if (fs.existsSync(file.path)) {
        fs.unlink(file.path, (err: Error) => {
          if (err) {
            error[error.length] = {
              name: 'remove',
              message: `Failed to remove: ${err}`,
            };
          }
        });
      }
    });
    return { error, paths };
  };

  private deleteReportById = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (id) {
      try {
        return response.status(204).json(await this.reportService.delete(id));
      } catch (err) {
        return response.status(404).json(err.errors);
      }
    }
    return response.status(404);
  };
}

export default ReportController;
