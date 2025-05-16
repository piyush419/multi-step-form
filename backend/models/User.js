import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  gender: String,
  customGender: String,
  dob: Date,
  profession: String,
  companyName: String,
  addressLine1: String,
  country: String,
  state: String,
  city: String,
  subscriptionPlan: String,
  newsletter: { type: Boolean, default: true },
  profilePic: String
});
export default  mongoose.model('User', userSchema);
