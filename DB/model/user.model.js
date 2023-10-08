import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:String,
    googleId:String,
    thumbnail:String
}, { timestamps: true });

const userModel = model("User", userSchema);
export default userModel;
