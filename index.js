// Server creation and configuration
const http = require('http');
const app = require('./src/app');

// Config .env
require('dotenv').config();

//configuracion DB
//la conexion de la base de datos se crea cuando arranque el index y se queda abierta, en SQL esto se hace en los modelos
require("./src/config/db.js");

// Server creation
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on('listening', () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});