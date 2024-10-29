const request = require("supertest");//me permite partir desde un punto concreto de la app
const app = require("../../src/app");//en este caso parto de app.js saltando el levantar el servidor en index.js
//las siguientes son las mismas lineas que db.js pero esto es por si estubiera usando una base de tados de prueba. En este caso
//uso la misma pero lo logico es usar una que no sea la de desarrollo
const mongoose = require("mongoose");
const Product = require("../../src/models/products.models");//lo voy a necesitar para resetear la db despues de cada prueba

require('dotenv').config();//tengo que requerir aqui tambien porque NO PASAMOS por el index.js que es donde estaba definido
const direccionDB = process.env.URLDB;//traigo la url del .env y la asigno a la variable direccionDB

describe("Api de productos", () => {
    beforeAll(async () => {//hacer algo antes de todo
        //conexion a base de datos (de db de prueba) ANTES DE TODAS las pruebas
        await mongoose.connect(direccionDB);
    });

    describe("GET de /api/productos", () => {
        let response;
        //beforeAll lo que haya dentro se ejecutará una vez antes DE CADA TEST, existe el beforeEach se ejecuta cada vez por cada test
        beforeAll(async () => {
            //request.app voy directo a app.js y le mando un get directamente a la ruta "/api/products"
            response = await request(app).get("/api/products").send();
        });

        it("debería responder con status 200", () => {
            //.toBe que sea igual a 
            expect(response.statusCode).toBe(200);
        })

        it("Debería responder con un JSON", () => {
            // .toContain que lleve algo en la cabecera en "[content-type]" algo como "appli...." es como un LIKE "*application/json*" si viene algo mas me da igual
            expect(response.headers['content-type']).toContain("application/json");
        });

        it("Deberia ser un array de objetos", () => {
            expect(response.body).toBeInstanceOf(Array);// .toBeInstanceOff() mira el tipo de dato devuelto
        });

    });

    describe("POST de /api/productos", () => {
        let response;
        const cuerpo = {//Creamos el objeto que le pasaremos en el body de la peticion POST de SUPERTEST
            name: "lapiz",
            description: "lapiz verde",
            price: 15,
            department: "test",
            stock: 150,
            available: true
        };

        beforeAll(async () => {
            response = await request(app).post("/api/products").send(cuerpo); //en este caso dentro del send le paso un BODY
        });

        beforeAll(async () => {//Dejar la base de datos igual que antes del test, sino llenaremos de mierda la db cada test que hagamos
            await Product.deleteMany({ department: "test" });// {<-esto} es como WHERE department="test"
        });

        it("deberia funcionar la URL", () => {
            expect(response.statusCode).toBe(201);//si el statusCode es 201 es que ha llegado
            expect(response.headers['content-type']).toContain("application/json");
        })

        it("debería devoler un _id correcto", () => {
            expect(response.body._id).toBeDefined();//mira si está definida la clave en un object
        });

        it("deberian los valores enviados ser los mismos que se guardan", () => {
            expect(response.body.name).toBe(cuerpo.name);
            expect(response.body.description).toBe(cuerpo.description);
            expect(response.body.department).toBe(cuerpo.department);
            expect(response.body.price).toBe(cuerpo.price);
            expect(response.body.stock).toBe(cuerpo.stock);
            expect(response.body.avaliable).toBe(cuerpo.avaliable);
        });
    })

    // describe("PUT de /api/productos/<Id del producto>", () => {
    //     let productoCreado;
    //     const cuerpo = {//Creamos el objeto que le pasaremos en el body de la peticion POST de SUPERTEST
    //         name: "lapiz",
    //         description: "lapiz verde",
    //         price: 15,
    //         department: "test",
    //         stock: 150,
    //         available: true
    //     };

    //     beforeAll(async () => {
    //         productoCreado = await Product.create(cuerpo);//crear producto a actualizar
    //         //ERROR PARECE ESTAR AQUI response = await request(app).put(`/api/products/${Product._id}`).send({ price: 30, stock: 300 });//lanzar peticion PUT sobre producto creado
    //     });

    //     afterAll(async () => {
    //         await Product.findByIdAndDelete(productoCreado._id);//en vez del deleteMany hay esta otra funcion de encontrar y borrar por id 
    //     });

    //     it("Debería funcionar la URL", () => {
    //         expect(response.statusCode).toBe(200);
    //         expect(response.headers["content-type"]).toContain("application/json");
    //     });
    //     // it("deberian los valores enviados ser los mismos que se guardan", () => {
    //     //     expect(response.body.precio).toBe(30);
    //     //     expect(response.body.Stock).toBe(300);
    //     // });
    // });

    describe('DELETE /api/products/<PRODUCTID>', () => {

        let product;
        let response;
        const body = { name: 'Lápiz verde', description: 'Pinta en verde', department: 'test', price: 14, stock: 200, available: true };
        beforeAll(async () => {
            // 1. Crear el producto que vamos a borrar
            product = await Product.create(body);

            // 2. Lanzamos la petición
            response = await request(app)
                .delete(`/api/products/${product._id}`)
                .send();
        });

        afterAll(async () => {
            // Borrar el producto creado para las pruebas
            await Product.findByIdAndDelete(product._id);
        });

        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto no debería existir en la BD', async () => {
            const productDeleted = await Product.findById(product._id);
            expect(productDeleted).toBeNull();
        });

    });

    afterAll(async () => {//hacer algo despues de todo OJO PODRÍA IR DEBAJO DEL beforeAll pero queda mas entendible AQUI!!!
        //DESCONEXION (de db de prueba) cuando finalizen TODAS LAS PRUEBAS
        await mongoose.disconnect();
    });
});