const Instruktur = require("../models/instruktur");

exports.getAllInstruktur = async (req, res, next) => {
  try {
    const data = await Instruktur.find().sort("nama");
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getInstrukturById = async (req, res, next) => {
  try {
    const data = await Instruktur.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Instruktur tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.createInstruktur = async (req, res, next) => {
  try {
    const data = await Instruktur.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Instruktur berhasil ditambahkan",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateInstruktur = async (req, res, next) => {
  try {
    const data = await Instruktur.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Instruktur tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Instruktur berhasil diubah",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteInstruktur = async (req, res, next) => {
  try {
    const data = await Instruktur.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Instruktur tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Instruktur berhasil dihapus",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
