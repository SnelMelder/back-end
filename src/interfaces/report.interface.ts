import { Schema } from 'mongoose';
import ReportStatus from '../helpers/enums/reportStatus.enum';
import InjuryType from '../helpers/enums/injuryType.enum';
import incidentType from '../helpers/enums/incidentType.enum';
import InjurySite from '../helpers/enums/injurySite.enum';

interface Report {
  _id?: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  projectLocation: Schema.Types.ObjectId;
  dateTime: Date;
  personInvolved?: string;
  witness?: string;
  additionalInformation?: string;
  anonymous: boolean;
  environmentalDamage: boolean;
  materialDamage: boolean;
  contractorAdditionalInfo?: string;
  status: ReportStatus;
  incidentType: incidentType[];
  incidentTypeAdditionalInfo: string;
  injuryType: InjuryType;
  injurySite: InjurySite[];
  createdAt?: Date,
  updatedAt?: Date
}

export default Report;
