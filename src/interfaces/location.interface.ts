import { Schema } from 'mongoose';

interface Location {
  _id?: Schema.Types.ObjectId;
  contractor: Schema.Types.ObjectId;
  name: string;
  longitude: number;
  latitude: number;
  active: boolean;
}

export default Location;
