import express from 'express';
import { protect } from '../middleware/auth.middleware';
import User from '../models/User.model';
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

// Actualizar perfil de usuario
router.put('/profile', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user!._id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar perfil'
    });
  }
});

export default router;

