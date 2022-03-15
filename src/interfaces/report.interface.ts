import { Schema } from 'mongoose';
import ReportStatus from '../helpers/enums/reportStatus.enum';

interface Report {
  _id?: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  projectLocation: Schema.Types.ObjectId;
  dateTime: Date;
  personInvolved?: string;
  witness?: string;
  additionalInformation?: string;
  anonymous: boolean;
  environmentalDamage?: string;
  materialDamage?: string;
  contractorAdditionalInfo?: string;
  status: ReportStatus;
}

export default Report;
