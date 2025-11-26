const express = require("express");
const router = express.Router();
const movimientoController = require("../controllers/movimiento.controller");

router.post("/", movimientoController.create);
router.get("/", movimientoController.findAll);
router.get("/:id", movimientoController.findOne);
router.put("/:id", movimientoController.update);
router.delete("/:id", movimientoController.delete);

module.exports = router;
