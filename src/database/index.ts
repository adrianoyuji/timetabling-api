import mongoose from "mongoose";

import * as dotenv from "dotenv";

dotenv.config();

export default function DBConnect() {
  mongoose.connect(
    process.env.MONGODB_URI as string,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to mongo atlas!")
  );
}
