const mongoose = require("mongoose");

//const { Schema, model } = require("mongoose");

const userSchema = new mongoose.Schema(

    {
        username: String,
        email: String,
        password: String,
        //Si queremos definir más el campo lo hacemos enun objeto, type tipo de campo, default valor por defecto si no pongo nada
        role: { type: String, default: "regular" },
        //relacion con la tabla product para poder añadir muchas referencias (por eso está entre corchetes)
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]

    }, {
    timestamps: true, versionKey: false
}

);

const User = mongoose.model("user", userSchema);
module.exports = User;