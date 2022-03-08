import { model, Schema } from 'mongoose';
import ReportInterface from '../interfaces/report.interface';
import ReportStatus from '../helpers/enums/reportStatus.enum';

const reportSchema = new Schema<ReportInterface>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    materialDamage: { type: String },
    personInvolved: { type: String },
    projectLocationId: { type: Schema.Types.ObjectId },
    additionalInformation: { type: String },
    witness: { type: String },
    status: {
      type: Number,
      enum: ReportStatus,
      default: ReportStatus.send,
    },
  },
  {
    timestamps: true,
  },
);
const reportModel = model('Report', reportSchema);

export default reportModel;
