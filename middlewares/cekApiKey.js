function cekApiKey(req, res, next) {
  const expectedKey = process.env.API_KEY;
  const receivedKey = req.get("x-api-key");

  if (!expectedKey) {
    return next(new Error("API_KEY belum diatur pada file .env"));
  }

  if (receivedKey !== expectedKey) {
    return res.status(401).json({
      status: "error",
      message: "API key tidak valid atau tidak dikirim",
      data: null,
    });
  }

  next();
}

module.exports = cekApiKey;
