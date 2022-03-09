import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import LocationService from '../services/locationService';
import LocationInterface from '../interfaces/location.interface';

class LocationController implements Controller {
  public path = '/location';

  public router = Router();

  private locationService = new LocationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllActiveLocations);
    this.router.get(`${this.path}/all`, this.getAllLocations);
    this.router.get(`${this.path}/:id`, this.getLocationById);
    this.router.post(`${this.path}`, this.createLocation);
    this.router.put(`${this.path}`, this.updateLocation);
    this.router.delete(`${this.path}/:id`, this.deleteLocation);
  }

  private getAllActiveLocations = async (request: Request, response: Response) => {
    try {
      return response.status(200)
        .json(await this.locationService.getAllActiveLocations());
    } catch (err) {
      return response.status(404);
    }
  };

  private getAllLocations = async (request: Request, response: Response) => {
    try {
      return response.status(200)
        .json(await this.locationService.getAllLocations());
    } catch (err) {
      return response.status(404);
    }
  };

  private getLocationById = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      if (id) {
        return response.status(200)
          .json(await this.locationService.getById(id));
      }
      return response.status(404);
    } catch (err) {
      return response.status(404);
    }
  };

  private createLocation = async (request: Request, response: Response) => {
    try {
      const newLocation: LocationInterface = request.body;
      if (newLocation) {
        try {
          return response.status(201).json(await this.locationService.create(newLocation));
        } catch (err) {
          return response.status(404).json(err.errors);
        }
      }
      return response.status(404);
    } catch (err) {
      return response.status(404);
    }
  };

  private updateLocation = async (request: Request, response: Response) => {
    try {
      const updatedLocation: LocationInterface = request.body;
      if (updatedLocation) {
        try {
          return response.status(201)
            .json(await this.locationService.update(updatedLocation));
        } catch (err) {
          return response.status(404).json(err.errors);
        }
      }
      return response.status(404);
    } catch (err) {
      return response.status(404);
    }
  };

  private deleteLocation = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (id) {
      return response.status(204)
        .json(await this.locationService.delete(id));
    }
    return response.status(404);
  };
}

export default LocationController;
