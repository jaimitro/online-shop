const User = require("../models/users.models.js");
const encriptador = require("bcryptjs");
const helper = require("../utils/helpers.js");

const crearUsuario = async (req, res, next) => {
    try {
        //encriptar password
        const passEncriptado = await encriptador.hash(req.body.password, 9);
        req.body.password = passEncriptado;//machacamos el password
        const usuario = await User.create(req.body);
        res.json(usuario);
    } catch (error) {
        next(error);
    }
}

const logearUsuario = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // busco usuario / findOne devuelve nulo si no lo encuentra
        const usuarioFound = await User.findOne({ email: email });
        // existe el usuario?
        if (!usuarioFound) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
        }
        // comparo la clave del body(escrita por el usuario) con la clave del usuario recuperado(encriptada y guardad en la db)
        const iguales = await encriptador.compare(password, usuarioFound.password);
        if (!iguales) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
        }
        //crear token
        const nuevoToken = helper.createToken(usuarioFound);//le paso el body para extraer luego el id y role

        res.json({ message: "Login correcto", nuevoToken });
    } catch (error) {
        next(error);
    }
}

const agregarProductoAlCarro = async (req, res, next) => {
    try {
        const { productId } = req.params;
        req.usuarioIncrustado.cart.push(productId);
        await req.usuarioIncrustado.save();//guarda en la base de datos algo que hemos cambiado

        res.json(req.usuarioIncrustado);

    } catch (error) {
        next(error);
    }
}

const verUsuario = async (req, res, next) => {
    res.json(req.usuarioIncrustado);
}

module.exports = {
    crearUsuario,
    logearUsuario,
    agregarProductoAlCarro,
    verUsuario,
}