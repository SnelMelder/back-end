import { model, Schema } from 'mongoose';
import ReportInterface from '../interfaces/report.interface';
import InjurySite from '../helpers/enums/injurySite.enum';
import IncidentType from '../helpers/enums/incidentType.enum';
import DamageType from '../helpers/enums/damageType.enum';

const reportSchema = new Schema<ReportInterface>(
  {
    oid: {
      type: String,
      ref: 'User',
      required: false,
    },
    anonymous: {
      type: Boolean,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    personInvolved: { type: String },
    projectLocation: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    additionalInformation: { type: String },
    witness: { type: String },
    injurySite: {
      type: [String],
      enum: InjurySite,
      required: true,
    },
    incidentType: {
      type: [String],
      enum: IncidentType,
      required: true,
    },
    damageTypes: {
      type: [String],
      enum: DamageType,
      required: true,
    },
    incidentTypeAdditionalInfo: {
      type: String,
    },
    pictureList: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);
const reportModel = model('Report', reportSchema);

export default reportModel;
