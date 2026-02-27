import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected  Succesfully With MongoDB");
  } catch (error) {
    console.log("Can not Connect With the database", error);
    process.exit(1);  
  }
};

export default connectDB;
