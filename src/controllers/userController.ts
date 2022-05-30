import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user';
import UserInterface from '../interfaces/user.interface';

class UserController implements Controller {
  public path = '/user';

  public router = Router();

  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.post(`${this.path}`, this.createUser);
  }

  private getAllUsers = async (request: Request, response: Response) => {
    try {
      return response.status(200)
        .json(await this.user.find({}));
    } catch (err) {
      return response.status(404)
        .json('Not found');
    }
  };

  private getUserById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await this.user.findById(id);
    if (user) {
      response.status(200)
        .json(user);
    } else {
      return response.status(404)
        .json(`User with ${id} not found`);
    }
    return response.status(404)
      .json('Not found');
  };

  private createUser = async (request: Request, response: Response) => {
    try {
      const user: UserInterface = request.body;
      if (user) {
        try {
          const newUser = await this.user.create(user);
          response.status(200)
            .json(newUser);
        } catch (err) {
          response.status(404)
            .json(err.errors);
        }
      }
    } catch (err) {
      response.status(404)
        .json(err.errors);
    }
  };
}

export default UserController;
