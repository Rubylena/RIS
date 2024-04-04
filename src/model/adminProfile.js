import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminProfileSchema = new Schema(
  {
    email: {
      type: "string",
      trim: true,
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
    industry: {
      type: String,
      trim: true,
      required: [true, "Indicate the type of industry."],
    },
    no_of_employees: {
      type: Number,
      trim: true,
    },
    locations: {
      type: [String],
      trim: true,
    },
    current_ris: {
      type: String,
      trim: true,
    },
    challenges: {
      type: String,
      trim: true,
    },
    reason_for_use: {
      type: String,
      trim: true,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("companyProfile", adminProfileSchema);
