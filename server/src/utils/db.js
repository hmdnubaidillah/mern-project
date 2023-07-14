import mongoose from "mongoose";
let isConnected = false;

export async function connectToDb() {
  if (isConnected) console.log("Database is already connected");

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "mern-project",
    });

    isConnected = true;
    console.log("Database is connected succesfully");
  } catch (error) {
    console.log("Database failed to connect, error : ", error);
  }
}
