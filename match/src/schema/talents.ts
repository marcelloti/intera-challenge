import { Document, model, Schema } from "mongoose";

export type TalentModel = Document & {};

export const talentSchema = new Schema(
  {
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
    timestamps: true
  }
);
export default model<TalentModel>("Talent", talentSchema);
