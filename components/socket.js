
const express = require('express');
const app = express();
let dataProducts=[];



module.exports = (io) => 
  io.on('connection', socket => {
    console.log('conexion websocket establecida')
    socket.on('productNotification', socket => {
      dataProducts.push(socket)
      io.sockets.emit('productNotification', dataProducts)
      app.render('chat.hbs', {dataProducts})
    })})

