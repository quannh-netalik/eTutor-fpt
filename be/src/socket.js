import app from './app.js';
import { Server } from 'socket.io';
import http from 'http';
import { Message } from './models/message.model.js';

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// Socket
io.on('connection', (socket) => {
  console.log('We have a new connection!!!');


  socket.on('room', (room) => {
    socket.join(room);
  });

  socket.on('Send message', async (msg) => {
    try {
      const newMessage = new Message({
        message: msg.message,
        sender: msg.sender,
        receiver: msg.receiver
      });
      const chat = await newMessage.save();
      const message = await Message.aggregate([
        { $match: { _id: chat._id } },
        { $lookup: { from: 'users', localField: 'sender', foreignField: '_id', as: 'sender' } },
        { $lookup: { from: 'users', localField: 'receiver', foreignField: '_id', as: 'receiver' } },
        { $unwind: '$sender' },
        { $unwind: '$receiver' },
      ]);
      console.log(msg.message);
      const room = 'Joker';
      io.to(room).emit('Send message back', message);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnection', () => {

  });
});

