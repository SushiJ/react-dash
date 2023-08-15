import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/dash?retryWrites=true&w=majority";
export default async function connect() {
  mongoose.connect(MONGO_URL);
}
