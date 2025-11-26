const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller");

router.post("/", categoriaController.create);
router.get("/", categoriaController.findAll);
router.get("/:id", categoriaController.findOne);
router.put("/:id", categoriaController.update);
router.delete("/:id", categoriaController.delete);

module.exports = router;
