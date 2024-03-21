const express = require('express');
//Servideor de sockets
const http = require('http');
//Configuracion del socket server
const socketio = require('socket.io');

const path = require('path');
const Sockets = require('./sockets');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app);
        this.io = socketio(this.server);

    }

    middlewares() {
        //Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        //Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.configurarSockets();

        //Inicializar server
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo al puerto: ', this.port);
        });
    }
}

module.exports = Server;