const mongoose = require("mongoose");
//usare schema y model, podría traer por separado cada uno {schema, model}=require("mongoose");

const esquemaProducto = new mongoose.Schema({
    name: String, //nombre y tipo, los tipos estan definidos en la web https://www.mongodb.com
    description: String,
    tags: [String],//al estar entre corchetes significa que es un array de strings
    price: Number,
    department: String,
    stock: Number,
    available: Boolean,
    //campo relacionado user es el nombre definido en users.models -> const User = mongoose.model("user", userSchema);
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true, //para que se creeen dos campos automaticamente, cuando creamos y cuando actualizamos
    versionKey: false, //para que no aparezca la version, solo por que no nos moleste el ruido de mas datos
});

//(nombre coleccion (OJO en singular ingles), esquema creado, Tercer parametro si quiero
//obviar que controle el nombre de la coleccion y ponerselo yo)
const Product = mongoose.model("product", esquemaProducto);

module.exports = Product;