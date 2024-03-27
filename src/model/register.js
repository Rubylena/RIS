import mongoose from "mongoose";
import { Schema } from "mongoose";

const registerAdminSchema = new Schema(
  {
    company_name: {
      type: "string",
      trim: true,
      required: [true, "Company name is compulsory."],
    },
    type_of_company: {
      type: "string",
      required: [true, "Indicate the type of company."],
    },
    email: {
      type: "string",
      required: [true, "Please add a unique email address."],
      unique: true,
      trim: true,
    },
    phone_number: {
      type: "number",
      trim: true,
    },
    password: {
      type: "string",
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

export default mongoose.model("admins", registerAdminSchema);
