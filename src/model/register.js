import mongoose from "mongoose";
import { Schema } from "mongoose";

const registerAdminSchema = new Schema(
  {
    email: {
      type: "string",
      required: [true, "Please add a unique email address."],
      unique: true,
      trim: true,
    },
    password: {
      type: "string",
      required: [true, "Password is required."],
      trim: true,
    },
    role: {
      type: "string",
      trim: true,
      default: "admin",
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", registerAdminSchema);
