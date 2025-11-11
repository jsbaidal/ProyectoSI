import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import Chat, { Message } from '../models/Chat.model';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const setupSocketIO = (io: Server) => {
  // Middleware de autenticación para Socket.IO
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Token no proporcionado'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new Error('Usuario no encontrado'));
      }

      socket.userId = user._id.toString();
      next();
    } catch (error) {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`Usuario conectado: ${socket.userId}`);

    // Unirse a la sala del usuario
    socket.join(`user_${socket.userId}`);

    // Unirse a un chat específico
    socket.on('join_chat', async (chatId: string) => {
      const chat = await Chat.findById(chatId);
      if (chat && chat.participants.some(p => p.toString() === socket.userId)) {
        socket.join(`chat_${chatId}`);
        console.log(`Usuario ${socket.userId} se unió al chat ${chatId}`);
      }
    });

    // Enviar mensaje
    socket.on('send_message', async (data: { chatId: string; content: string }) => {
      try {
        const chat = await Chat.findById(data.chatId);
        
        if (!chat || !chat.participants.some(p => p.toString() === socket.userId)) {
          socket.emit('error', { message: 'No tienes permiso para enviar mensajes en este chat' });
          return;
        }

        // Crear mensaje
        const message = await Message.create({
          chat: data.chatId,
          sender: socket.userId,
          content: data.content
        });

        await message.populate('sender', 'name avatar');

        // Actualizar último mensaje del chat
        chat.lastMessage = message._id;
        chat.lastMessageAt = new Date();
        await chat.save();

        // Enviar mensaje a todos los participantes del chat
        io.to(`chat_${data.chatId}`).emit('new_message', message);

        // Notificar a los participantes que no están en el chat
        chat.participants.forEach(participantId => {
          if (participantId.toString() !== socket.userId) {
            io.to(`user_${participantId}`).emit('chat_notification', {
              chatId: data.chatId,
              message: message
            });
          }
        });
      } catch (error) {
        socket.emit('error', { message: 'Error al enviar mensaje' });
      }
    });

    // Marcar mensajes como leídos
    socket.on('mark_as_read', async (chatId: string) => {
      try {
        await Message.updateMany(
          { chat: chatId, sender: { $ne: socket.userId }, read: false },
          { read: true }
        );
      } catch (error) {
        console.error('Error al marcar mensajes como leídos:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Usuario desconectado: ${socket.userId}`);
    });
  });
};

