const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedor.controller");

router.post("/", proveedorController.create);
router.get("/", proveedorController.findAll);
router.get("/:id", proveedorController.findOne);
router.put("/:id", proveedorController.update);
router.delete("/:id", proveedorController.delete);

module.exports = router;
