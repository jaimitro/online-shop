//URL BASE: /api/users
const express = require("express");
const enrutador = express.Router();

const controllerUsers = require("../../controllers/users.controllers.js");
const { validarToken } = require("../../utils/middelwares.js");

enrutador.post("/register", controllerUsers.crearUsuario);
enrutador.post("/login", controllerUsers.logearUsuario);
enrutador.put("/add/:productId", validarToken, controllerUsers.agregarProductoAlCarro);
enrutador.get("/profile", validarToken, controllerUsers.verUsuario);

module.exports = enrutador;