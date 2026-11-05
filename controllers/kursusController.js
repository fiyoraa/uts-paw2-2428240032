const mongoose = require("mongoose");
const Instruktur = require("../models/instruktur");
const Kursus = require("../models/kursus");

const sortableFields = ["kodeKursus", "judul", "biaya", "level", "createdAt"];
const projectableFields = [
  "kodeKursus",
  "judul",
  "biaya",
  "level",
  "jadwal",
  "instrukturId",
];

function parsePage(value, fallback, minimum, maximum) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, minimum), maximum);
}

function allowedFields(value) {
  if (!value) return null;
  return value
    .split(",")
    .filter((field) => projectableFields.includes(field))
    .join(" ");
}

exports.getAllKursus = async (req, res, next) => {
  try {
    const { level, instrukturId, page, limit, sort, order, fields } = req.query;
    const filter = {};
    if (level) filter.level = level;

    if (instrukturId) {
      if (!mongoose.isValidObjectId(instrukturId)) {
        return res.status(400).json({
          status: "error",
          message: "instrukturId tidak valid",
          data: null,
        });
      }
      filter.instrukturId = instrukturId;
    }

    const pageNumber = parsePage(page, 1, 1, Number.MAX_SAFE_INTEGER);
    const limitNumber = parsePage(limit, 10, 1, 50);
    const sortField = sortableFields.includes(sort) ? sort : "_id";
    const sortDirection = order === "desc" ? -1 : 1;

    const [data, total] = await Promise.all([
      Kursus.find(filter)
        .select(allowedFields(fields))
        .populate("instrukturId", "kode nama")
        .sort({ [sortField]: sortDirection })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Kursus.countDocuments(filter),
    ]);

    res.status(200).json({
      data,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getKursusById = async (req, res, next) => {
  try {
    const data = await Kursus.findById(req.params.id).populate(
      "instrukturId",
      "kode nama"
    );
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Kursus tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.createKursus = async (req, res, next) => {
  try {
    const { instrukturId } = req.body;
    if (!instrukturId || !mongoose.isValidObjectId(instrukturId)) {
      return res.status(400).json({
        status: "error",
        message: "instrukturId harus berisi ObjectId valid",
        data: null,
      });
    }
    if (!(await Instruktur.exists({ _id: instrukturId }))) {
      return res.status(400).json({
        status: "error",
        message: "Instruktur yang dirujuk tidak ditemukan",
        data: null,
      });
    }

    const data = await Kursus.create(req.body);
    await data.populate("instrukturId", "kode nama");
    res.status(201).json({
      status: "success",
      message: "Kursus berhasil ditambahkan",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateKursus = async (req, res, next) => {
  try {
    if (req.body.instrukturId) {
      if (!mongoose.isValidObjectId(req.body.instrukturId)) {
        return res.status(400).json({
          status: "error",
          message: "instrukturId tidak valid",
          data: null,
        });
      }
      if (!(await Instruktur.exists({ _id: req.body.instrukturId }))) {
        return res.status(400).json({
          status: "error",
          message: "Instruktur yang dirujuk tidak ditemukan",
          data: null,
        });
      }
    }

    const data = await Kursus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("instrukturId", "kode nama");

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Kursus tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Kursus berhasil diubah",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteKursus = async (req, res, next) => {
  try {
    const data = await Kursus.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Kursus tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Kursus berhasil dihapus",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
