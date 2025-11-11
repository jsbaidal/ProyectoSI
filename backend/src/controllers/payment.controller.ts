import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Service from '../models/Service.model';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

// Crear intención de pago
export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const { serviceId, amount } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    // Verificar que el cliente es el dueño del servicio
    if (service.client.toString() !== req.user!._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para pagar este servicio'
      });
    }

    // Crear Payment Intent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: 'usd',
      metadata: {
        serviceId: serviceId,
        userId: req.user!._id.toString()
      }
    });

    // Actualizar servicio con paymentIntentId
    service.paymentIntentId = paymentIntent.id;
    await service.save();

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear intención de pago'
    });
  }
};

// Confirmar pago (webhook de Stripe)
export const confirmPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const service = await Service.findOne({ paymentIntentId });
      if (service) {
        service.paymentStatus = 'paid';
        service.finalCost = paymentIntent.amount / 100;
        await service.save();
      }
    }

    res.json({
      success: true,
      data: { status: paymentIntent.status }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al confirmar pago'
    });
  }
};

// Webhook de Stripe (debe ser público, sin autenticación)
export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret || '');
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const service = await Service.findOne({ paymentIntentId: paymentIntent.id });
    
    if (service) {
      service.paymentStatus = 'paid';
      service.finalCost = paymentIntent.amount / 100;
      await service.save();
    }
  }

  res.json({ received: true });
};

