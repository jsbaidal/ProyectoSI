import express from 'express';
import {
  createService,
  getMyServices,
  getWorkerServices,
  updateServiceStatus,
  getServiceById
} from '../controllers/service.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', protect, createService);
router.get('/me', protect, getMyServices);
router.get('/worker', protect, getWorkerServices);
router.get('/:id', protect, getServiceById);
router.put('/:id/status', protect, updateServiceStatus);

export default router;

