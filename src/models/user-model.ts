import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    country: string;
    city: string;
    profession: string;
    salary: number;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    salary: { type: Number, required: true }
})

const User = mongoose.model<IUser>("User", UserSchema);

export default User;