import { model, Schema } from 'mongoose';
import ReportInterface from '../interfaces/report.interface';
import ReportStatus from '../helpers/enums/reportStatus.enum';

const reportSchema = new Schema<ReportInterface>({
  additionalInformation: { type: String },
  anonymous: {
    type: Boolean,
    required: true,
  },
  contractorAdditionalInfo: { type: String },
  dateTime: {
    type: Date,
    required: true,
  },
  environmentalDamage: { type: String },
  id: { type: Schema.Types.ObjectId },
  materialDamage: { type: String },
  personInvolved: { type: String },
  projectLocationId: { type: Schema.Types.ObjectId },
  status: {
    type: Number,
    enum: ReportStatus,
    default: ReportStatus.send,
  },
  userId: Schema.Types.ObjectId,
  witness: { type: String },
});
const reportModel = model('Report', reportSchema);

export default reportModel;
