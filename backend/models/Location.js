import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  country: String,
  states: [{
    name: String,
    cities: [String]
  }]
});

export default  mongoose.model('Location', locationSchema);
