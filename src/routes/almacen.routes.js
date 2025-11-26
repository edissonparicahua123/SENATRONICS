const express = require("express");
const router = express.Router();
const almacenController = require("../controllers/almacen.controller");

router.post("/", almacenController.create);
router.get("/", almacenController.findAll);
router.get("/:id", almacenController.findOne);
router.put("/:id", almacenController.update);
router.delete("/:id", almacenController.delete);

module.exports = router;
