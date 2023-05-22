import { Schema } from 'mongoose';

interface Location {
  _id?: Schema.Types.ObjectId;
  contractors: string[];
  name: string;
  active: boolean;
}

export default Location;
