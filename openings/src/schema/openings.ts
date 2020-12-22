import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type OpeningModel = Document & {};

export const openingSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    position: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    seniority_level: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    location: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    remote_job: {
      type: Number, // 0 - False | 1 - True | 2 - Mixed
      default: 0,
      trim: true,
      required: true
    },
    work_schedule: {
      type: String,
      trim: true,
      required: true
    },
    job_responsibilities: {
      type: Array,
      lowercase: true,
      trim: true,
      required: true
    },
    job_requirements: {
      type: Array,
      lowercase: true,
      trim: true,
      required: false
    }
  },
  {
    timestamps: true
  }
);
export default model<OpeningModel>("Opening", openingSchema);
