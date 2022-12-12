import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import UserService from '../services/userService';

class UserController implements Controller {
  public path = '/users';

  public router = Router();

  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/contractors`, this.getAllContractors);
  }

  private getAllContractors = async (request: Request, response: Response) => {
    try {
      return response
        .status(200)
        .json(await this.userService.getAllContractors());
    } catch (err) {
      console.log(err);
      return response.status(404).json('Not found');
    }
  };
}

export default UserController;
