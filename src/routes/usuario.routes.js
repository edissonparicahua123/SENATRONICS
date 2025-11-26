const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/", usuarioController.create);
router.get("/", usuarioController.findAll);
router.get("/:id", usuarioController.findOne);
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.delete);

module.exports = router;
