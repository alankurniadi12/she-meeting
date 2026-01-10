import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/she_meeting');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDatabase;