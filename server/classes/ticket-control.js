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


        // Obteniendo información de data/data.json
        let data = require('../data/data.json');


        // console.log(data);

        // Empezando nueva jornada de tickets cada nuevo día
        if (data.hoy === this.hoy) {


            this.ultimo = data.ultimo;

            this.tickets = data.tickets;



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

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }


    // Reiniciando conteo de día
    reiniciarConteo() {
        this.ultimo = 0;

        // Reiniciaando tickets pendientes
        this.tickets = [];

        console.log('Se ha inicializado el sistema');

        this.grabarArchivo();
    }

    // Grabando en  data.json
    grabarArchivo() {
        // Reinicializando el archivo de texto
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets
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