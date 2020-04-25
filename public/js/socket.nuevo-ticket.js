// Lógica para manejar los nuevos tickets


// Comando para establecer la conexón
var socket = io();


// JQuery para múltiples referencias html
var label = $('#lblNuevoTicket');

// Conectado con el servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');
});


// Desconectado con el servidor
socket.on('disconnect', function() {
    console.log('Se perdió la conexión con el servidor');
});

// Listener al boton para generar el nuevo ticket
$('button').on('click', function() {

    // segundo argumento es cuando so interesa que reciba nada pero el tercero es que al final ejecute una función
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        // pasando información al elemento html lblNuevoTicket
        label.text(siguienteTicket);
    });

});