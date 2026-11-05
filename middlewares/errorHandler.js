function notFound(req, res) {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
    data: null,
  });
}

function errorHandler(err, req, res, next) {
  if (err.code === 11000) {
    return res.status(409).json({
      status: "error",
      message: "Nilai unique sudah digunakan",
      data: err.keyValue,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Data tidak valid",
      data: Object.values(err.errors).map((item) => item.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "Format ID atau nilai tidak valid",
      data: null,
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
    data: null,
  });
}

module.exports = { notFound, errorHandler };
