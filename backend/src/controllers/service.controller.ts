import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Service from '../models/Service.model';
import Worker from '../models/Worker.model';

// Crear solicitud de servicio
export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const serviceData = {
      ...req.body,
      client: req.user!._id
    };

    const service = await Service.create(serviceData);
    await service.populate('client', 'name email phone');
    await service.populate('worker', 'user trades hourlyRate');

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear servicio'
    });
  }
};

// Obtener servicios del cliente
export const getMyServices = async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query: any = { client: req.user!._id };

    if (status) {
      query.status = status;
    }

    const services = await Service.find(query)
      .populate('worker', 'user trades hourlyRate')
      .populate('client', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string) * 1)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string));

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      data: {
        services,
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener servicios'
    });
  }
};

// Obtener servicios del trabajador
export const getWorkerServices = async (req: AuthRequest, res: Response) => {
  try {
    const worker = await Worker.findOne({ user: req.user!._id });
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Perfil de trabajador no encontrado'
      });
    }

    const { status, page = 1, limit = 10 } = req.query;
    const query: any = { worker: worker._id };

    if (status) {
      query.status = status;
    }

    const services = await Service.find(query)
      .populate('client', 'name email phone')
      .populate('worker', 'user trades hourlyRate')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string) * 1)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string));

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      data: {
        services,
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener servicios'
    });
  }
};

// Actualizar estado del servicio
export const updateServiceStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status, finalCost } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    // Verificar permisos
    const worker = await Worker.findOne({ user: req.user!._id });
    const isClient = service.client.toString() === req.user!._id.toString();
    const isWorker = worker && service.worker.toString() === worker._id.toString();

    if (!isClient && !isWorker) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar este servicio'
      });
    }

    service.status = status;
    if (finalCost) service.finalCost = finalCost;
    if (status === 'completed') service.completedAt = new Date();

    await service.save();
    await service.populate('client', 'name email phone');
    await service.populate('worker', 'user trades hourlyRate');

    res.json({
      success: true,
      data: service
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar servicio'
    });
  }
};

// Obtener servicio por ID
export const getServiceById = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('worker', 'user trades hourlyRate');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener servicio'
    });
  }
};

