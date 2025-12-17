import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_Uri);
    console.log(`Connected to Db  `);
  } catch (error) {
    console.error(`error connecting`);
  }
};
