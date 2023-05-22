import LocationModel from '../models/location';
import LocationInterface from '../interfaces/location.interface';
import UserInterface from 'interfaces/user.interface';
import ReportModel from '../models/report';
import ReportInterface from '../interfaces/report.interface';
import App from '../app';
import ReportStatus from './enums/reportStatus.enum';
import DamageType from './enums/damageType.enum';
import { faker } from '@faker-js/faker';
import IncidentTypeEnum from './enums/incidentType.enum';
import IncidentType from './enums/incidentType.enum';
import InjurySite from './enums/injurySite.enum';

require('dotenv').config();

const location = LocationModel;
const report = ReportModel;

async function DeleteAllFromDatabase() {
  await report.deleteMany({});
  await location.deleteMany({});
}

async function createLocation(): Promise<LocationInterface> {
  const newLocation: LocationInterface = {
    contractors: ['some-contractor-id'],
    name: faker.address.cityName(),
    active: true,
  };
  return newLocation;
}

async function createReport(
  locationParam: LocationInterface,
): Promise<ReportInterface> {
  const newReport: ReportInterface = {
    oid: '123456-1234-1234-1234-1234-1234a5',
    projectLocation: locationParam._id,
    dateTime: new Date(),
    anonymous: false,
    incidentType: [
      IncidentTypeEnum.dangerousAct,
      IncidentType.accident,
      IncidentType.other,
    ],
    incidentTypeAdditionalInfo: faker.animal.dog(),
    damageTypes: [DamageType.environmental],
    injurySite: [InjurySite['right-arm'], InjurySite['left-arm']],
  };
  return newReport;
}

async function seedAll(seedAmount: number) {
  for (let i = 0; i < seedAmount; i++) {
    const seededLocation = await location.create(await createLocation());
    console.log('@@@ Location' + seededLocation);

    await report.create(await createReport(seededLocation));
  }
}

async function Seed() {
  App.connectDatabase()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

  //Uncomment to delete all entities from database.
  await DeleteAllFromDatabase();

  //Seed all entities with the amount entered as parameter.
  await seedAll(10);

  process.exit(1);
}

Seed();
