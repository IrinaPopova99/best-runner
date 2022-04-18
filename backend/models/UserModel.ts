import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  workouts: { type: [Schema.Types.ObjectId], ref: 'User' }
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;