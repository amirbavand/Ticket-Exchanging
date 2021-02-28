import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("needing a jwt key");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.log("problem with database, cannot connect");
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!!!!!!!!!!!");
  });
};

start();
