require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Kursus = require("./models/kursus");
const Instruktur = require("./models/instruktur");

async function seed() {
  await connectDB();
  await Kursus.deleteMany({});
  await Instruktur.deleteMany({});

  const instruktur = await Instruktur.insertMany([
    { kode: "INS01", nama: "Budi Santoso" },
    { kode: "INS02", nama: "Sari Wijaya" },
  ]);

  await Kursus.insertMany([
    {
      kodeKursus: "KRS001",
      judul: "Bahasa Inggris Dasar",
      biaya: 750000,
      level: "dasar",
      jadwal: { hari: "Senin", jam: "16:00" },
      instrukturId: instruktur[0]._id,
    },
    {
      kodeKursus: "KRS002",
      judul: "Microsoft Office",
      biaya: 650000,
      level: "menengah",
      jadwal: { hari: "Rabu", jam: "16:00" },
      instrukturId: instruktur[1]._id,
    },
  ]);

  console.log("Seeding selesai: 2 instruktur dan 2 kursus");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
