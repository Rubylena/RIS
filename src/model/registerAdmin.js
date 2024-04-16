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
    first_name: {
      type: "string",
      required: [true, "First name is required."],
      trim: true,
    },
    last_name: {
      type: "string",
      required: [true, "Last name is required."],
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
    company_name: {
      type: "string",
      trim: true,
      required: [true, "Company name is compulsory."],
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
    },
    no_of_employees: {
      type: Number,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    verificationToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", registerAdminSchema);
