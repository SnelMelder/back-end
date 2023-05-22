import { Schema } from 'mongoose';
import DamageType from '../helpers/enums/damageType.enum';
import incidentType from '../helpers/enums/incidentType.enum';
import InjurySite from '../helpers/enums/injurySite.enum';

interface Report {
  _id?: Schema.Types.ObjectId;
  oid: String;
  projectLocation: Schema.Types.ObjectId;
  dateTime: Date;
  personInvolved?: string;
  witness?: string;
  additionalInformation?: string;
  anonymous: boolean;
  incidentType: incidentType[];
  incidentTypeAdditionalInfo: string;
  damageTypes: DamageType[];
  injurySite: InjurySite[];
  pictureList?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default Report;
