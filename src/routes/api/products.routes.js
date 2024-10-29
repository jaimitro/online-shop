//URL BASE: /api/products
const express = require("express");
const enrutador = express.Router();
const { validarToken } = require("../../utils/middelwares.js");

const controllerProducts = require("../../controllers/products.controllers.js");

enrutador.get("/available", controllerProducts.verProductosConStock);
enrutador.get("/price", controllerProducts.verProductosEntrePrecios);

enrutador.get("/", validarToken, controllerProducts.verTodosProductos);

enrutador.get("/:idProduct", controllerProducts.verProductoPorId);
enrutador.get("/dpt/:departamento", controllerProducts.verProductosPorDepartamento);

enrutador.post("/", validarToken, controllerProducts.crearNuevoProducto);
enrutador.put("/:idProduct", validarToken, controllerProducts.actualizarProducto);
enrutador.delete("/:idProduct", validarToken, controllerProducts.eliminarProducto);

module.exports = enrutador;