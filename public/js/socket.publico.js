// Comando para establecer la conexón
var socket = io();

// Llamando id de cada ticket
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

// Llamando id de cada escritorio
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

// Creando arreglo de asignación
var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


// Recibiendo socket del servidor
socket.on('estadoActual', function(data) {
    // console.log(data);

    actualizarHTML(data.ultimos4);


});

// Actualizando html por que se lo llama varias veces
function actualizarHTML(ultimos4) {

    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }


}