const tokenator = require("jsonwebtoken");
const User = require("../models/users.models");

exports.validarToken = async (req, res, next) => {

    // Comprobar si el token viene incluido en la cabecera Authorization
    const tokenCabecera = req.headers['authorization'];
    if (!tokenCabecera) {
        return res.status(403).json({ message: 'Es necesario incluir el token de autorización.' });
    }

    // Comprobar si el token es correcto
    let tokenDescifrado
    try {
        tokenDescifrado = tokenator.verify(tokenCabecera, 'en un lugar de la mancha');
    } catch (error) {
        return res.status(400).json({ message: "El token es incorrecto." });
    }

    // Recupero el usuario para compararlo con el del token
    const usuarioFound = await User.findById(tokenDescifrado.usuario_id).populate("cart");

    // Si el El usuario no existe
    if (!usuarioFound) {
        return res.status(403).json({ message: 'El usuario no existe' });
    }

    // Colocamos el usuario dentro de la petición
    req.usuarioIncrustado = usuarioFound;

    //así al validar el token incrustamos los datos del usuario en el body y los podemos usar en las siguiente etapas de la peticion
    next();
}