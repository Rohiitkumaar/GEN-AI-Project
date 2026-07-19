import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already taken."],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "User already exist with this email id."],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const userModel = mongoose.model("users", UserSchema);

export default userModel;