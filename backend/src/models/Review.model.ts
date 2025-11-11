import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  service: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId; // quien hace la reseña
  reviewed: mongoose.Types.ObjectId; // quien recibe la reseña (worker o client)
  rating: number; // 1-5
  comment: string;
  type: 'client_to_worker' | 'worker_to_client';
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reviewed: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 500
    },
    type: {
      type: String,
      enum: ['client_to_worker', 'worker_to_client'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Un usuario solo puede hacer una reseña por servicio
ReviewSchema.index({ service: 1, reviewer: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', ReviewSchema);

