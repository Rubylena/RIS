import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGO_DB_CONNECTION_URL;

const connectToMongoDb = () => {
  mongoose.connect(URL);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB:", err);
    process.exit(1);
  });
};

export default connectToMongoDb;
