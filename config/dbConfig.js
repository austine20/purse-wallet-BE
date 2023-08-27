const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const connectDb = mongoose.connection;

connectDb.on("error", () => {
  console.log("DB connection error");
});
connectDb.on("connected", () => {
  console.log("DB connected successfully");
});

module.exports = connectDb;
