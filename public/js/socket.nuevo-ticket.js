let socket = io();
let label = document.querySelector('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor');
})

socket.on('disconnect', () => {
    console.log('Se ha desconectado del servidor');
})

socket.on('currentTicket', (resp) => {
    label.innerHTML = resp.actual;
})

let buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; ++i) {
    let btn = buttons[i];
    btn.addEventListener('click', () => {
        socket.emit('nextTicket', null, (nextTicket) => {
            label.innerHTML = nextTicket;
        });
    })
}