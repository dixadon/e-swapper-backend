const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => socket.join(room));
  socket.on('sendMessage', ({ room, message }) => {
    socket.to(room).emit('receiveMessage', message);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
