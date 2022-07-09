const { io } = require('../index');
// const Band = require('../models/band');
// const Bands = require('../models/bands');

console.log('init server');


// Mensaje de Sockets
io.on('connection', client => {
  console.log('Cliente conectado')

  client.on('disconnect', () => {
    console.log('Cliente desconectado')
  });

});