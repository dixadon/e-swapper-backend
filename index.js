const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// ✅ MongoDB URI - use .env or hardcoded fallback
const mongoUri = process.env.MONGO_URI || "mongodb+srv://admin2:y3U2V9oqaX2zPUHO@e-swapper.zpfidcw.mongodb.net/e-swapper?retryWrites=true&w=majority&appName=e-swapper";

// ✅ Only ONE mongoose.connect call
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware and routes
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// ✅ Real-time messaging setup
io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => socket.join(room));
  socket.on('sendMessage', ({ room, message }) => {
    socket.to(room).emit('receiveMessage', message);
  });
});

// ✅ Start server
server.listen(5000, () => console.log('🚀 Server running on port 5000'));
