import { Schema } from 'mongoose';

interface UserInterface {
  _id?: Schema.Types.ObjectId;
  name: string,
  role: string,
}

export default UserInterface;
