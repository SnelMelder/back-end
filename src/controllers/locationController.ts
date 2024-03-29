import { Request, Response, Router } from 'express';
import {
  checkJwt,
  requiredScopes,
  scopes,
} from '../middlewares/auth.middleware';
import Controller from '../interfaces/controller.interface';
import LocationService from '../services/locationService';
import LocationInterface from '../interfaces/location.interface';

class LocationController implements Controller {
  public path = '/locations';

  public router = Router();

  private locationService = new LocationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      checkJwt,
      requiredScopes(scopes.locations.read),
      this.getAllActiveLocations,
    );
    this.router.get(
      `${this.path}/all`,
      checkJwt,
      requiredScopes(scopes.locations.read),
      this.getAllLocations,
    );
    this.router.get(
      `${this.path}/:id`,
      checkJwt,
      requiredScopes(scopes.locations.read),
      this.getLocationById,
    );
    this.router.post(
      `${this.path}`,
      checkJwt,
      requiredScopes(scopes.locations.create),
      this.createLocation,
    );
    this.router.put(
      `${this.path}`,
      checkJwt,
      requiredScopes(scopes.locations.update),
      this.updateLocation,
    );
    this.router.delete(
      `${this.path}/:id`,
      checkJwt,
      requiredScopes(scopes.locations.delete),
      this.deleteLocation,
    );
  }

  private getAllActiveLocations = async (
    request: Request,
    response: Response,
  ) => {
    try {
      return response
        .status(200)
        .json(await this.locationService.getAllActiveLocations());
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private getAllLocations = async (request: Request, response: Response) => {
    try {
      return response
        .status(200)
        .json(await this.locationService.getAllLocations());
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private getLocationById = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      if (id) {
        return response
          .status(200)
          .json(await this.locationService.getById(id));
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private createLocation = async (request: Request, response: Response) => {
    try {
      const newLocation: LocationInterface = request.body;
      if (newLocation) {
        try {
          return response
            .status(201)
            .json(await this.locationService.create(newLocation));
        } catch (err) {
          return response.status(404).json(err.errors);
        }
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private updateLocation = async (request: Request, response: Response) => {
    try {
      const updatedLocation: LocationInterface = request.body;
      if (updatedLocation) {
        try {
          return response
            .status(201)
            .json(await this.locationService.update(updatedLocation));
        } catch (err) {
          return response.status(404).json(err.errors);
        }
      }
      return response.status(404);
    } catch (err) {
      return response.status(404).json(err.errors);
    }
  };

  private deleteLocation = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (id) {
      try {
        return response.status(204).json(await this.locationService.delete(id));
      } catch (err) {
        return response.status(404).json(err.errors);
      }
    }
    return response.status(404);
  };
}

export default LocationController;
