// FileSystem
const fs = require('fs');


class TicketControl {

    constructor() {


        // ültimo ticket que se generó
        this.ultimo = 0;

        this.hoy = new Date().getDate();


        // Obteniendo información de data/data.json
        let data = require('../data/data.json');


        // console.log(data);

        // Empezando nueva jornada de tickets cada nuevo día
        if (data.hoy === this.hoy) {


            this.ultimo = data.ultimo;



        } else {
            this.reiniciarConteo();
        }



    }

    // Siguiente Ticket
    siguienteTicket() {

        this.ultimo += 1;
        this.grabarArchivo();


        return `Ticket ${this.ultimo}`;

    }


    // Reiniciando conteo de día
    reiniciarConteo() {
        this.ultimo = 0;

        console.log('Se ha inicializado el sistema');

        this.grabarArchivo();
    }

    // Grabando en  data.json
    grabarArchivo() {
        // Reinicializando el archivo de texto
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy
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