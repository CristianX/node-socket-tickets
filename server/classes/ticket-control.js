// FileSystem
const fs = require('fs');

// Atendiendo tickets pendientes, no se exporta por que se usa internamente
class Ticket {
    constructor(numero, escritorio) {


        this.numero = numero;

        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {


        // ültimo ticket que se generó
        this.ultimo = 0;

        this.hoy = new Date().getDate();

        this.tickets = [];

        // Ultimos 4 es la pantalla que todos ven cuando se atiende tickets
        this.ultimos4 = [];


        // Obteniendo información de data/data.json
        let data = require('../data/data.json');


        // console.log(data);

        // Empezando nueva jornada de tickets cada nuevo día
        if (data.hoy === this.hoy) {


            this.ultimo = data.ultimo;

            this.tickets = data.tickets;

            this.ultimos4 = data.ultimos4;



        } else {
            this.reiniciarConteo();
        }



    }

    // Siguiente Ticket
    siguienteTicket() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        // Agregando al arreglo de tickets
        this.tickets.push(ticket);

        this.grabarArchivo();


        return `Ticket ${this.ultimo}`;

    }

    // Mostrando ultimo ticket
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    // Mostrando ultimos 4 tickets
    getUltimos4() {
        return this.ultimos4;
    }

    // Atendiendo tickets, recibiendo número de escritrio
    atenderTicket(escritorio) {

        // Verificando tickets pendientes de atender
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        // Extrayendo número para romper la relación que tiene js con que todos los objetos son pasados por referencia
        let numeroTicket = this.tickets[0].numero;

        // Eliminando el primer ticket del arreglo para que no se acumule los tickets atendidos
        this.tickets.shift();

        // Atendiendo ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // Agregando item al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        // Verificando solo 4 tickets en el arreglo
        if (this.ultimos4.length > 4) {
            // Borrando último item
            this.ultimos4.splice(-1, 1);
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }


    // Reiniciando conteo de día
    reiniciarConteo() {
        this.ultimo = 0;

        // Reiniciaando tickets pendientes
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');

        this.grabarArchivo();
    }

    // Grabando en  data.json
    grabarArchivo() {
        // Reinicializando el archivo de texto
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        //Guardando en el archivo de texto
        fs.writeFileSync('./server/data/data.json', jsonDataString);

        // console.log('Se ha inicializado el sistema');
    }



}


module.exports = {
    TicketControl
}