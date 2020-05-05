const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocation } = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/user');

const app = express();
// we created http server
const server = http.createServer(app);
// passed it to socket io because it expects an http server
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publichPath = path.join(__dirname, '../public');

app.use(express.static(publichPath));

io.on('connection', (socket) => {
  console.log('New Websocket connection');

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    // join is to join that room
    socket.join(user.room);

    // same name for client and server side
    socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome!'));
    socket.broadcast
      .to(user.room)
      .emit(
        'welcomeMessage',
        generateMessage('Admin', `${user.username} has joined`)
      );
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    //   io sends it to all clients
    io.to(user.room).emit(
      'welcomeMessage',
      generateMessage(user.username, message)
    );
    callback('Delivered');
  });

  socket.on('sendLocation', (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      'locationMessage',
      generateLocation(
        user.username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback('Location shared');
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'welcomeMessage',
        generateMessage('Admin', `${user.username} has left`)
      );
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
