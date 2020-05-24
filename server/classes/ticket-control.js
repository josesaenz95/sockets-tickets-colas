/**
 * 
 */
const fs = require('fs');
const { Ticket } = require('./ticket');

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo++;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    ultimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    ultimos4() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        if (this.ultimosCuatro === undefined) {
            this.ultimosCuatro = [];
        }

        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1); // Borra el último elemento de un array
        }

        console.log('Últimos 4');
        console.log(this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let json = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };

        let jsonString = JSON.stringify(json);
        fs.writeFileSync('./server/data/data.json', jsonString);
    }
}


module.exports = {
    TicketControl
}