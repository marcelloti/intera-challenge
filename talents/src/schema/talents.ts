import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type TalentModel = Document & {};

export const talentSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    first_name: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
      required: true
    },
    last_name: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
      required: true
    },
    position: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    phone: {
      type: Number,
      trim: true,
      unique: true,
      required: true
    },
    linkedin: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: false
    },
    salary_requirements: {
      type: Number,
      trim: true,
      unique: false,
      required: true
    },
    higher_education: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);
export default model<TalentModel>("Talent", talentSchema);
