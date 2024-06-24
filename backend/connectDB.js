import mongoose from "mongoose";

export default async function connectDB() {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "zu_verschenken",
      });
      console.log(`MongoDB connected to: ${conn.connection.name}`);
    } catch (error) {
      console.log(error);
    }
}
  