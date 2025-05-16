import mongoose from "mongoose";

export const connectDb = async ()=>{
    try{
        const result = await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully")
    }catch(error) {
         console.log("database connection failed " , error.message)
    }
}