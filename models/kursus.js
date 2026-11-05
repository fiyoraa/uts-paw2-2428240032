const mongoose = require("mongoose");

const jadwalSchema = new mongoose.Schema(
  {
    hari: { type: String, required: true, trim: true },
    jam: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const kursusSchema = new mongoose.Schema(
  {
    kodeKursus: { type: String, required: true, unique: true, trim: true },
    judul: { type: String, required: true, trim: true },
    biaya: { type: Number, required: true, min: 0 },
    level: { type: String, required: true, trim: true },
    jadwal: { type: jadwalSchema, required: true },
    instrukturId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instruktur",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kursus", kursusSchema);
