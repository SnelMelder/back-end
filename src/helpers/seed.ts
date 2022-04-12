import 'dotenv/config';
import LocationModel from '../models/location';
import LocationInterface from '../interfaces/location.interface';
import UserInterface from 'src/interfaces/user.interface';
import ReportModel from '../models/report';
import userModel from '../models/user';
import ReportInterface from '../interfaces/report.interface';
import App from '../app';
import ReportStatus from './enums/reportStatus.enum';
import InjuryType from './enums/injuryType.enum';
import { faker } from '@faker-js/faker';

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
    user: contractorParam._id,
    projectLocation: locationParam._id,
    dateTime: new Date(),
    anonymous: false,
    environmentalDamage: false,
    materialDamage: false,
    status: ReportStatus.inProgress,
    incidentType: [],
    incidentTypeAdditionalInfo: faker.animal.dog(),
    injuryType: InjuryType.both,
    injurySite: []
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






