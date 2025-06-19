// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.get('/', (req, res) => res.send('Chat server running'));

io.on('connection', (socket) => {
  console.log('🟢 User connected');
  
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

server.listen(5000, () => console.log('✅ Chat server running on port 5000'));
