import LocationModel from '../models/location';
import LocationInterface from '../interfaces/location.interface';
import UserInterface from 'interfaces/user.interface';
import ReportModel from '../models/report';
import userModel from '../models/user';
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
const user = userModel;

async function DeleteAllFromDatabase() {
  await report.deleteMany({});
  await location.deleteMany({});
  await user.deleteMany({});
}

async function createContractor(): Promise<UserInterface> {
  const newContractor: UserInterface = {
    name: faker.name.findName(),
    role: faker.animal.cat()
  };
  return newContractor;
}

async function createLocation(contractorParam: UserInterface): Promise<LocationInterface> {
  const newLocation: LocationInterface = {
    contractor: contractorParam._id,
    name: faker.address.cityName(),
    longitude: +faker.address.longitude(),
    latitude: +faker.address.latitude(),
    active: true
  };
  return newLocation;
}

async function createReport(contractorParam: UserInterface, locationParam: LocationInterface): Promise<ReportInterface> {
  const newReport: ReportInterface = {
    oid: "123456-1234-1234-1234-1234-1234a5",
    projectLocation: locationParam._id,
    dateTime: new Date(),
    anonymous: false,
    environmentalDamage: false,
    materialDamage: false,
    status: ReportStatus.inProgress,
    incidentType: [IncidentTypeEnum.dangerousAct, IncidentType.accident, IncidentType.other],
    incidentTypeAdditionalInfo: faker.animal.dog(),
    damageTypes: [DamageType.environmental],
    injurySite: [InjurySite['right-arm'], InjurySite['left-arm']]
  };
  return newReport;
}

async function seedAll(seedAmount: number) {

  for (let i = 0; i < seedAmount; i++) {

    const seededContractor = await user.create(await createContractor());
    console.log('!!! contractor' + seededContractor);

    const seededLocation = await location.create(await createLocation(seededContractor));
    console.log('@@@ Location' + seededLocation);

    await report.create(await createReport(seededContractor, seededLocation));
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






