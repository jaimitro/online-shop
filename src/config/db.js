const mongoose = require("mongoose");

//tengo que requerir aqui tambien porque NO PASAMOS por el index.js que es donde estaba definido
require('dotenv').config();
const direccionDB = process.env.URLDB;

mongoose.connect(direccionDB);
//ESTA URL ESTA ON LINE POR SI TENGO PROBLEMAS CON LA LOCAL mongoose.connect("mongodb+srv://root:mongodbpassword@cluster1.cc8gu.mongodb.net/"); 