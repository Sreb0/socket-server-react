

class Sockets {

    constructor(io) {

        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        //On connecion
        this.io.on('connection', (socket) => {

            //Escuchar data
            socket.on('mensaje-to-server', (data) => {
                console.log(data);
                //socket.emit('mensaje-from-server', data); //un cliente
                this.io.emit('mensaje-from-server', data); //a todos conectados
            });

        });
    }

}




module.exports = Sockets;