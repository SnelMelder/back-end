import 'dotenv/config';
import LocationModel from '../models/location';
import LocationInterface from '../interfaces/location.interface';
import UserInterface from 'interfaces/user.interface';
import ReportModel from '../models/report';
import userModel from '../models/user';
import ReportInterface from '../interfaces/report.interface';
import App from '../app';
import ReportStatus from './enums/reportStatus.enum';
import InjuryType from './enums/injuryType.enum';


  const location = LocationModel;
  const report = ReportModel;
  const user = userModel;

  async function Seed(){
    App.connectDatabase()
      .then(() => console.log('Database connected'))
      .catch((err) => console.log(err));

      const newContractor = await seedContractor();
      const newLocation = await seedLocation(newContractor);
      const newReport = await seedReports(newLocation,newContractor)

      process.exit(1);
  }
 

  async function seedContractor(): Promise<UserInterface>{
    try{
      const contractor : UserInterface = {
        name: 'Bob',
        role: 'Uitvoerder'
      }
      return user.create(contractor);
    }
    catch(err){
      console.log(err);
    }
   
  }
   

  async function seedLocation (contractor: UserInterface): Promise<LocationInterface>{
    console.log(contractor)
    const newLocation : LocationInterface = {
      contractor: contractor._id,
      name: 'Eindhoven TQ4',
      longitude: 5.478000,
      latitude: 51.436600,
      active: true
    }
    return location.create(newLocation);
  }

async function seedReports (location : LocationInterface, user: UserInterface){
  console.log(location);
  const newReport : ReportInterface = {
    user: user._id,
    projectLocation: location._id,
    dateTime: new Date(),
    anonymous: false,
    environmentalDamage: false,
    materialDamage: false,
    status: ReportStatus.inProgress,
    incidentType: [],
    incidentTypeAdditionalInfo: 'overige info',
    injuryType: InjuryType.both,
    injurySite: []
  }
  return report.create(newReport);
  };

  Seed();






