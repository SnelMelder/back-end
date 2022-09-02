import App from './app';
import UserController from './controllers/userController';
import DefaultController from './controllers/defaultController';
import ReportController from './controllers/reportController';
import LocationController from './controllers/locationController';

const app = new App(
  [
    new DefaultController(),
    new UserController(),
    new ReportController(),
    new LocationController(),
  ],
);

app.listen();
