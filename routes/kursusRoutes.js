const express = require("express");
const cekApiKey = require("../middlewares/cekApiKey");
const controller = require("../controllers/kursusController");

const router = express.Router();
router.get("/", controller.getAllKursus);
router.get("/:id", controller.getKursusById);
router.post("/", cekApiKey, controller.createKursus);
router.put("/:id", cekApiKey, controller.updateKursus);
router.delete("/:id", cekApiKey, controller.deleteKursus);

module.exports = router;
