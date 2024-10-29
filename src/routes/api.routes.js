//URL BASE: /api
const express = require("express");
const enrutador = express.Router();

enrutador.use("/products", require("./api/products.routes.js"));
enrutador.use("/users", require("./api/users.routes.js"));

module.exports = enrutador;