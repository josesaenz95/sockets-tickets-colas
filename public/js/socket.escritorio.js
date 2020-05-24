let socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
})

socket.on('disconnect', () => {
    console.log('Se ha desconectado del servidor');
})

let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');
let small = document.querySelector('#ticketActual');

document.querySelector('#numEscritorio').innerHTML = `Escritorio  ${escritorio}`;

let buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; ++i) {
    let btn = buttons[i];
    btn.addEventListener('click', () => {
        socket.emit('attendTicket', { escritorio }, (resp) => {
            if (resp === 'No hay tickets') {
                small.innerHTML = resp;
                return;
            }
            small.innerHTML = `Ticket ${resp.numero}`;
        })
    })
}