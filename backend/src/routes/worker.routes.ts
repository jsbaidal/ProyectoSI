import express from 'express';
import {
  createOrUpdateWorkerProfile,
  searchWorkers,
  getWorkerById,
  getMyWorkerProfile
} from '../controllers/worker.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/search', protect, searchWorkers);
router.get('/me', protect, getMyWorkerProfile);
router.get('/:id', protect, getWorkerById);
router.post('/', protect, createOrUpdateWorkerProfile);
router.put('/', protect, createOrUpdateWorkerProfile);

export default router;

