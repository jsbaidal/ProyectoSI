import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  stripeWebhook
} from '../controllers/payment.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Webhook debe estar antes de protect (no requiere autenticación)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

router.post('/create-intent', protect, createPaymentIntent);
router.post('/confirm', protect, confirmPayment);

export default router;

