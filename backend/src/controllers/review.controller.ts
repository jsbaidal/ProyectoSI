import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Review from '../models/Review.model';
import Service from '../models/Service.model';
import Worker from '../models/Worker.model';
import User from '../models/User.model';

// Crear reseña
export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { serviceId, rating, comment, type } = req.body;

    // Verificar que el servicio existe y está completado
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    if (service.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden calificar servicios completados'
      });
    }

    // Verificar que el usuario tiene permiso para calificar
    const isClient = service.client.toString() === req.user!._id.toString();
    const worker = await Worker.findById(service.worker);
    const isWorker = worker && worker.user.toString() === req.user!._id.toString();

    if (!isClient && !isWorker) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para calificar este servicio'
      });
    }

    // Verificar que no haya una reseña previa
    const existingReview = await Review.findOne({
      service: serviceId,
      reviewer: req.user!._id,
      type
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Ya has calificado este servicio'
      });
    }

    // Determinar quién recibe la reseña
    let reviewedId;
    if (type === 'client_to_worker') {
      if (!isClient) {
        return res.status(403).json({
          success: false,
          message: 'Solo el cliente puede calificar al trabajador'
        });
      }
      reviewedId = worker!.user;
    } else {
      if (!isWorker) {
        return res.status(403).json({
          success: false,
          message: 'Solo el trabajador puede calificar al cliente'
        });
      }
      reviewedId = service.client;
    }

    // Crear reseña
    const review = await Review.create({
      service: serviceId,
      reviewer: req.user!._id,
      reviewed: reviewedId,
      rating,
      comment,
      type
    });

    await review.populate('reviewer', 'name avatar');
    await review.populate('reviewed', 'name avatar');

    // Actualizar calificación del trabajador si es cliente->trabajador
    if (type === 'client_to_worker' && worker) {
      const reviews = await Review.find({
        reviewed: reviewedId,
        type: 'client_to_worker'
      });

      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / reviews.length;

      worker.rating = averageRating;
      worker.totalReviews = reviews.length;
      await worker.save();
    }

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear reseña'
    });
  }
};

// Obtener reseñas de un trabajador
export const getWorkerReviews = async (req: AuthRequest, res: Response) => {
  try {
    const worker = await Worker.findById(req.params.workerId);
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Trabajador no encontrado'
      });
    }

    const reviews = await Review.find({
      reviewed: worker.user,
      type: 'client_to_worker'
    })
      .populate('reviewer', 'name avatar')
      .populate('service', 'title')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener reseñas'
    });
  }
};

