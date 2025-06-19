const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('✅ Chat backend is running');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  // Receive and broadcast messages
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
