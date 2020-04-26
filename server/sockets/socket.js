const { io } = require('../server');



// Clases
const { TicketControl } = require('../classes/ticket-control');


// Llamando ticketControl (disparando el constructor)
const ticketControl = new TicketControl();


io.on('connection', (client) => {



    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);

        // Regresando información del siguiente ticket para que pueda escribirlo en el lblNuevoTicket del html
        callback(siguiente);
    });

    // Emitiendo evento para saber el ticket actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // Actualizar / notificar cambios en los ULTIMOS 4

    });



    // console.log('Usuario conectado');

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });



    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);


    //     // if (mensaje.usuario) {
    //     //     callback({
    //     //         resp: 'TODO SALIO BIEN!'
    //     //     });

    //     // } else {
    //     //     callback({
    //     //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     //     });
    //     // }



    // });

});