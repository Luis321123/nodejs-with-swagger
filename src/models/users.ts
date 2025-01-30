import { Schema, model } from 'mongoose';
import { IUser } from '../schemas/Users'; // Importa la interfaz de usuario


export const userSchema = new Schema<IUser>({
  name: { type: String, required: true},
  age: {type: Number, required: true},
  email: {type:String, required: true},
});

export const User = model<IUser>('User', userSchema);