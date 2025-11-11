import express from 'express';
import {
  getOrCreateChat,
  getMyChats,
  getChatMessages
} from '../controllers/chat.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', protect, getMyChats);
router.post('/', protect, getOrCreateChat);
router.get('/:chatId/messages', protect, getChatMessages);

export default router;

