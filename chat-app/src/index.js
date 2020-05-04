const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
// we created http server
const server = http.createServer(app);
// passed it to socket io because it expects an http server
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publichPath = path.join(__dirname, '../public');

app.use(express.static(publichPath));

const message = 'Welcome!!!';

io.on('connection', (socket) => {
  console.log('New Websocket connection');

  // same name for client and server side
  socket.emit('welcomeMessage', message);
  socket.broadcast.emit('welcomeMessage', 'A new user has joined');

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    //   io sends it to all clients
    io.emit('welcomeMessage', message);
    callback('Delivered');
  });

  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'locationMessage',
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback('Location shared');
  });

  socket.on('disconnect', () => {
    io.emit('welcomeMessage', 'A user has left');
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
