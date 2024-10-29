const tokenator = require('jsonwebtoken');

exports.createToken = (usuario) => {
    const data = {
        usuario_id: usuario.id,
        usuario_role: usuario.role,
    }
    return tokenator.sign(data, 'en un lugar de la mancha');
}