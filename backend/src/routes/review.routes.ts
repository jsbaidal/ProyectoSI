import express from 'express';
import { createReview, getWorkerReviews } from '../controllers/review.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/worker/:workerId', protect, getWorkerReviews);

export default router;

