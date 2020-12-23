import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type ExampleModel = Document & {};

export const exampleSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);
export default model<ExampleModel>("Example", exampleSchema);
