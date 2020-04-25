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





        } else {
            this.reiniciarConteo();
        }



    }


    // Reiniciando conteo de día
    reiniciarConteo() {
        // Reinicializando el archivo de texto
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy
        };

        let jsonDataString = JSON.stringify(jsonData);

        //Guardando en el archivo de texto
        fs.writeFileSync('./server/data/data.json', jsonDataString);

        console.log('Se ha inicializado el sistema');
    }



}


module.exports = {
    TicketControl
}