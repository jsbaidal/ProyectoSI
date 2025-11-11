import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Worker from '../models/Worker.model';
import User from '../models/User.model';

// Crear o actualizar perfil de trabajador
export const createOrUpdateWorkerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id;
    const workerData = req.body;

    // Verificar que el usuario sea trabajador
    if (req.user!.role !== 'worker') {
      return res.status(403).json({
        success: false,
        message: 'Solo los trabajadores pueden crear perfiles'
      });
    }

    let worker = await Worker.findOne({ user: userId });

    if (worker) {
      // Actualizar perfil existente
      worker = await Worker.findOneAndUpdate(
        { user: userId },
        { ...workerData, user: userId },
        { new: true, runValidators: true }
      ).populate('user', 'name email phone avatar');
    } else {
      // Crear nuevo perfil
      worker = await Worker.create({
        ...workerData,
        user: userId
      });
      await worker.populate('user', 'name email phone avatar');
    }

    res.json({
      success: true,
      data: worker
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear/actualizar perfil'
    });
  }
};

// Búsqueda inteligente de trabajadores
export const searchWorkers = async (req: AuthRequest, res: Response) => {
  try {
    const {
      trade,
      city,
      state,
      minRating,
      maxPrice,
      lat,
      lng,
      radius = 50, // km
      experience,
      verified,
      page = 1,
      limit = 10
    } = req.query;

    const query: any = {};

    // Filtro por oficio
    if (trade) {
      query.trades = { $in: [trade] };
    }

    // Filtro por ciudad/estado
    if (city) query['location.city'] = new RegExp(city as string, 'i');
    if (state) query['location.state'] = new RegExp(state as string, 'i');

    // Filtro por calificación mínima
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating as string) };
    }

    // Filtro por precio máximo
    if (maxPrice) {
      query.hourlyRate = { $lte: parseFloat(maxPrice as string) };
    }

    // Filtro por experiencia
    if (experience) {
      query.experience = { $gte: parseInt(experience as string) };
    }

    // Filtro por verificación
    if (verified === 'true') {
      query.isVerified = true;
    }

    let workers = await Worker.find(query)
      .populate('user', 'name email phone avatar isVerified')
      .sort({ rating: -1, totalReviews: -1 });

    // Filtro por geolocalización si se proporciona
    if (lat && lng) {
      const userLat = parseFloat(lat as string);
      const userLng = parseFloat(lng as string);
      const radiusInKm = parseFloat(radius as string);

      workers = workers.filter((worker) => {
        const distance = calculateDistance(
          userLat,
          userLng,
          worker.location.coordinates.lat,
          worker.location.coordinates.lng
        );
        return distance <= radiusInKm;
      });
    }

    // Paginación
    const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedWorkers = workers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        workers: paginatedWorkers,
        total: workers.length,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(workers.length / parseInt(limit as string))
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al buscar trabajadores'
    });
  }
};

// Obtener perfil de trabajador por ID
export const getWorkerById = async (req: AuthRequest, res: Response) => {
  try {
    const worker = await Worker.findById(req.params.id)
      .populate('user', 'name email phone avatar isVerified');

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Trabajador no encontrado'
      });
    }

    res.json({
      success: true,
      data: worker
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener trabajador'
    });
  }
};

// Obtener mi perfil de trabajador
export const getMyWorkerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const worker = await Worker.findOne({ user: req.user!._id })
      .populate('user', 'name email phone avatar isVerified');

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Perfil de trabajador no encontrado'
      });
    }

    res.json({
      success: true,
      data: worker
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener perfil'
    });
  }
};

// Función auxiliar para calcular distancia (fórmula de Haversine)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

