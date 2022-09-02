import 'dotenv/config';
import App from './app';
import UserController from './controllers/userController';
import DefaultController from './controllers/defaultController';
import ReportController from './controllers/reportController';
import LocationController from './controllers/locationController';

require('dotenv').config();

const app = new App(
  [
    new DefaultController(),
    new UserController(),
    new ReportController(),
    new LocationController(),
    // new HelloWorldController(),
  ],
);

app.listen();
