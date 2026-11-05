require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const kursusRoutes = require("./routes/kursusRoutes");
const instrukturRoutes = require("./routes/instrukturRoutes");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "API Lembaga Kursus aktif" });
});
app.use("/kursus", kursusRoutes);
app.use("/instruktur", instrukturRoutes);
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`)))
    .catch((err) => {
      console.error("Gagal memulai server:", err.message);
      process.exit(1);
    });
}

module.exports = app;
