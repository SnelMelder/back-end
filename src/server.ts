import 'dotenv/config';
import App from './app';
import UserController from './controllers/userController';

const app = new App(
  [
    new UserController(),
  ],
);

app.listen();
