const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
//const io = new Server(server);
const cors = require('cors');
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST']
    }
  });

  app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }));

  
let users = [];

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (username) => {
    const user = { id: socket.id, username };
    users.push(user);
    io.emit('user list', users);
    console.log(`${username} has joined the chat.`);
  });

  socket.on('chat message', (msg) => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      const message = { userId: user.id, username: user.username, msg };
      console.log(`message from ${user.username}: ${msg}`);
      io.emit('chat message', message);
    }
  });

  socket.on('disconnect', () => {
    const userIndex = users.findIndex(u => u.id === socket.id);
    if (userIndex !== -1) {
      const [user] = users.splice(userIndex, 1);
      io.emit('user list', users);
      console.log(`${user.username} has left the chat.`);
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
