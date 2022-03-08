import 'dotenv/config';
import App from './app';
import UserController from './controllers/userController';
import DefaultController from './controllers/defaultController';
import ReportController from './controllers/reportController';

const app = new App(
  [
    new DefaultController(),
    new UserController(),
    new ReportController(),
  ],
);

app.listen();
