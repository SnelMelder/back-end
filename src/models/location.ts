import { model, Schema } from 'mongoose';
import LocationInterface from '../interfaces/location.interface';

const locationSchema = new Schema<LocationInterface>(
  {
    contractor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
const locationModel = model('Location', locationSchema);

export default locationModel;
