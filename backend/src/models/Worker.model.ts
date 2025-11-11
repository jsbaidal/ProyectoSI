import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  name: string;
  institution: string;
  issueDate: Date;
  expiryDate?: Date;
  certificateUrl?: string;
}

export interface IWorker extends Document {
  user: mongoose.Types.ObjectId;
  trades: string[]; // ['plomero', 'electricista', 'carpintero', etc.]
  experience: number; // años de experiencia
  hourlyRate: number;
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
  availability: {
    monday: { available: boolean; hours: string[] };
    tuesday: { available: boolean; hours: string[] };
    wednesday: { available: boolean; hours: string[] };
    thursday: { available: boolean; hours: string[] };
    friday: { available: boolean; hours: string[] };
    saturday: { available: boolean; hours: string[] };
    sunday: { available: boolean; hours: string[] };
  };
  certifications: ICertification[];
  portfolio: string[]; // URLs de imágenes de trabajos previos
  rating: number; // promedio de calificaciones
  totalReviews: number;
  isVerified: boolean;
  verificationDocuments: {
    idDocument?: string;
    proofOfAddress?: string;
    backgroundCheck?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema = new Schema<ICertification>({
  name: { type: String, required: true },
  institution: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date },
  certificateUrl: { type: String }
});

const WorkerSchema = new Schema<IWorker>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    trades: [{
      type: String,
      required: true
    }],
    experience: {
      type: Number,
      required: true,
      min: 0
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0
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
    availability: {
      monday: { available: { type: Boolean, default: true }, hours: [String] },
      tuesday: { available: { type: Boolean, default: true }, hours: [String] },
      wednesday: { available: { type: Boolean, default: true }, hours: [String] },
      thursday: { available: { type: Boolean, default: true }, hours: [String] },
      friday: { available: { type: Boolean, default: true }, hours: [String] },
      saturday: { available: { type: Boolean, default: false }, hours: [String] },
      sunday: { available: { type: Boolean, default: false }, hours: [String] }
    },
    certifications: [CertificationSchema],
    portfolio: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationDocuments: {
      idDocument: String,
      proofOfAddress: String,
      backgroundCheck: String
    }
  },
  {
    timestamps: true
  }
);

// Índices para búsqueda eficiente
WorkerSchema.index({ 'location.coordinates': '2dsphere' });
WorkerSchema.index({ trades: 1 });
WorkerSchema.index({ rating: -1 });
WorkerSchema.index({ isVerified: 1 });

export default mongoose.model<IWorker>('Worker', WorkerSchema);

