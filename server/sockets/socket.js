const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.siguienteTicket();
        console.log(next);

        callback(next);
    })

    client.emit('currentTicket', {
        actual: ticketControl.ultimoTicket(),
        ultimos4: ticketControl.ultimos4()
    })

    client.on('attendTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // actualizar/notificar cambios en los últimos 4
        // Emitir últimos 4

        client.broadcast.emit('lastFour', {
            ultimos4: ticketControl.ultimos4()
        })
    })
})