const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error("DB_URI belum diatur pada file .env");
  }

  await mongoose.connect(uri);
  console.log("MongoDB terhubung");
}

module.exports = connectDB;
