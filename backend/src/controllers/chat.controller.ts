import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Chat, { Message } from '../models/Chat.model';
import Service from '../models/Service.model';

// Crear o obtener chat
export const getOrCreateChat = async (req: AuthRequest, res: Response) => {
  try {
    const { participantId, serviceId } = req.body;
    const userId = req.user!._id;

    // Buscar chat existente
    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] }
    });

    if (!chat) {
      // Crear nuevo chat
      chat = await Chat.create({
        participants: [userId, participantId],
        service: serviceId || undefined
      });
    }

    await chat.populate('participants', 'name email avatar');
    if (chat.service) {
      await chat.populate('service', 'title status');
    }

    res.json({
      success: true,
      data: chat
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener/crear chat'
    });
  }
};

// Obtener todos los chats del usuario
export const getMyChats = async (req: AuthRequest, res: Response) => {
  try {
    const chats = await Chat.find({
      participants: req.user!._id
    })
      .populate('participants', 'name email avatar')
      .populate('lastMessage')
      .populate('service', 'title status')
      .sort({ lastMessageAt: -1, createdAt: -1 });

    res.json({
      success: true,
      data: chats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener chats'
    });
  }
};

// Obtener mensajes de un chat
export const getChatMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.some(p => p.toString() === req.user!._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para ver este chat'
      });
    }

    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string) * 1)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string));

    // Marcar mensajes como leídos
    await Message.updateMany(
      { chat: chatId, sender: { $ne: req.user!._id }, read: false },
      { read: true }
    );

    res.json({
      success: true,
      data: messages.reverse() // Ordenar de más antiguo a más reciente
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener mensajes'
    });
  }
};

