import { Schema } from 'mongoose';
import ReportStatus from '../helpers/enums/reportStatus.enum';

interface Report {
  id: Schema.Types.ObjectId;
  userId: string;
  projectLocationId: Schema.Types.ObjectId;
  dateTime: Date;
  personInvolved: string;
  witness: string;
  additionalInformation: string;
  anonymous: boolean;
  environmentalDamage: string;
  materialDamage: string;
  contractorAdditionalInfo: string;
  status: ReportStatus;
}

export default Report;
