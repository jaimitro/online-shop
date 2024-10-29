const Product = require("../models/products.models.js");

const verTodosProductos = async (req, res, next) => {
    try {
        //POPULATE hace que use el campo owner y busque su relacion y nos traiga los datos relacionados,
        //el segundo parámetro es para mostrar solo los campos que queramos
        const products = await Product.find().populate("owner", "username email");
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const verProductoPorId = async (req, res, next) => {
    try {
        const productoEncontrado = await Product.findById(req.params.idProduct);
        res.json(productoEncontrado);
    } catch (error) {
        next(error);
    }
}

const verProductosPorDepartamento = async (req, res, next) => {
    try {
        const productosPorDep = await Product.find({ department: req.params.departamento });
        res.json(productosPorDep);
    } catch (error) {
        next(error);
    }
}

const verProductosConStock = async (req, res, next) => {
    try {
        const productosConStock = await Product.find({ available: true, stock: { $gte: 28 } });
        res.json(productosConStock);
    } catch (error) {
        next(error);
    }
}

const verProductosEntrePrecios = async (req, res, next) => {
    try {
        const { min, max } = req.query;
        const listaProductos = await Product.find({ price: { $gte: min, $lte: max } });
        res.json(listaProductos);
    } catch (error) {
        next(error);
    }
}

const crearNuevoProducto = async (req, res, next) => {
    try {
        req.body.owner = req.usuarioIncrustado._id;
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

const actualizarProducto = async (req, res, next) => {
    try {
        // -->OJO<-- .findByIdAndUpdate DEVUELVE EL PRODUCTO ANTERIOR, si añadimos tercer parametro { new : true } DEVUELVE EL NUEVO
        const productoActualizado = await Product.findByIdAndUpdate(req.params.idProduct, req.body, { new: true });
        res.json(productoActualizado);
    } catch (error) {
        next(error);
    }
}

const eliminarProducto = async (req, res, next) => {
    try {
        const productoEliminado = await Product.findByIdAndDelete(req.params.idProduct);

        res.json(productoEliminado);
    } catch (error) {
        next(GeolocationPositionError);
    }
}

module.exports = {
    verTodosProductos,
    verProductoPorId,
    verProductosPorDepartamento,
    verProductosEntrePrecios,
    verProductosConStock,
    crearNuevoProducto,
    actualizarProducto,
    eliminarProducto
}