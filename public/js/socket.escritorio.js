// Comando para establecer la conexón
var socket = io();


// Parametros por el url
var searchParams = new URLSearchParams(window.location.search);

// Para preguntar si existe el escritorio, devuelve un true
if (!searchParams.has('escritorio')) {

    // Saliendose de la pantalla escritorio
    window.location = 'index.html';

    throw new Error('El escritorio es necesario');
}

// Si pasa el if, regresa los datos del parametro escritorio
var escritorio = searchParams.get('escritorio');

// Llamando a todos los small del html
var label = $('small');

console.log(escritorio);

// Poniendo información en la etiqueta h1 del escritorio.html
$('h1').text('Escritorio ' + escritorio);

// Listener del boton con su evento click
$('button').on('click', function() {

    // Poniendo información en la etiqueta small del escritorio.html
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        // console.log(resp);


        if (resp === 'No hay tickets') {
            label.text(resp);
            // Alerta normal
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);
    });

});