let socket = io();

let lblTicket1 = document.querySelector('#lblTicket1');
let lblTicket2 = document.querySelector('#lblTicket2');
let lblTicket3 = document.querySelector('#lblTicket3');
let lblTicket4 = document.querySelector('#lblTicket4');

let lblEscritorio1 = document.querySelector('#lblEscritorio1');
let lblEscritorio2 = document.querySelector('#lblEscritorio2');
let lblEscritorio3 = document.querySelector('#lblEscritorio3');
let lblEscritorio4 = document.querySelector('#lblEscritorio4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('currentTicket', (resp) => {
    actualizarDOM(resp.ultimos4);
})

socket.on('lastFour', (resp) => {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarDOM(resp.ultimos4);
})

function actualizarDOM(ultimos4) {
    for (let i = 0; i <= ultimos4.length - 1; ++i) {
        lblTickets[i].innerHTML = 'Ticket ' + ultimos4[i].numero;
        lblEscritorios[i].innerHTML = 'Escritorio ' + ultimos4[i].escritorio;
    }
}