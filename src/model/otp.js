import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    email: {
      type: "string",
      required: [true, "Please add a unique email address."],
      unique: true,
      trim: true,
    },
    value: {
      type: Number,
      trim: true,
      required: true,
    },
    createdAt: { type: Date, default: Date.now(), expires: 600 },
    updatedAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Otp", otpSchema);
