import mongoose, { Schema, Document } from 'mongoose';

export type ServiceStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface IService extends Document {
  client: mongoose.Types.ObjectId;
  worker: mongoose.Types.ObjectId;
  trade: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  scheduledDate?: Date;
  estimatedHours?: number;
  estimatedCost?: number;
  finalCost?: number;
  status: ServiceStatus;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    worker: {
      type: Schema.Types.ObjectId,
      ref: 'Worker',
      required: true
    },
    trade: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    },
    scheduledDate: {
      type: Date
    },
    estimatedHours: {
      type: Number,
      min: 0
    },
    estimatedCost: {
      type: Number,
      min: 0
    },
    finalCost: {
      type: Number,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    },
    paymentIntentId: {
      type: String
    },
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Índices
ServiceSchema.index({ client: 1 });
ServiceSchema.index({ worker: 1 });
ServiceSchema.index({ status: 1 });
ServiceSchema.index({ createdAt: -1 });

export default mongoose.model<IService>('Service', ServiceSchema);

