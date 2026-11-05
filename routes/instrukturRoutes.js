const express = require("express");
const cekApiKey = require("../middlewares/cekApiKey");
const controller = require("../controllers/instrukturController");

const router = express.Router();
router.get("/", controller.getAllInstruktur);
router.get("/:id", controller.getInstrukturById);
router.post("/", cekApiKey, controller.createInstruktur);
router.put("/:id", cekApiKey, controller.updateInstruktur);
router.delete("/:id", cekApiKey, controller.deleteInstruktur);

module.exports = router;
