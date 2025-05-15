import mongoose from "mongoose";

export async function Connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    connection.on("error", (err) => {
      console.log("something error");
      console.log(err);
    });
  } catch (error) {
    console.log("SomeThing Went Wrong");
    console.log(error);
  }
}
