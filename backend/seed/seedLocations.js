import mongoose from "mongoose";
import Location from "../models/Location";

mongoose.connect("mongodb+srv://gargp3064:jWYAtAir4vpz2ZBB@cluster0.mnb36lh.mongodb.net/")
  .then(() => console.log("MongoDB connected"));

const seedData = [
  {
    country: "USA",
    states: [
      { name: "California", cities: ["Los Angeles", "San Francisco", "San Diego"] },
      { name: "Texas", cities: ["Houston", "Dallas", "Austin"] }
    ]
  },
  {
    country: "India",
    states: [
      { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
      { name: "Karnataka", cities: ["Bangalore", "Mysore"] }
    ]
  }
];

Location.insertMany(seedData)
  .then(() => console.log("Locations seeded"))
  .catch(err => console.error(err))
  .finally(() => mongoose.disconnect());
