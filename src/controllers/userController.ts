import {
  NextFunction, Request, Response, Router,
} from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user';
import UserInterface from '../interfaces/user.interface';

class UserController implements Controller {
  public path = '/users';

  public router = Router();

  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.post(`${this.path}`, this.createUser);
  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const userQuery = this.user.findById(id);
    const user = await userQuery;
    if (user) {
      response.status(200)
        .json(user);
    } else {
      next(`User with ${id} not found`);
    }
  };

  private createUser = async (request: Request, response: Response, next: NextFunction) => {
    const user: UserInterface = request.body;
    if (user) {
      try {
        const newUser = await this.user.create(user);
        console.log(newUser);
        await newUser.save();
        response.status(200)
          .json(newUser);
      } catch (err) {
        next('Creation of new user failed.');
      }
    }
  };
}

export default UserController;
