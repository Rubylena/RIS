import asyncHandler from "express-async-handler";
import Admin from "../model/register.js";
import companyProfile from "../model/adminProfile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const adminRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const user = await Admin.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminRegister = await Admin.create({
    email,
    password: hashedPassword,
  });

  if (adminRegister) {
    res.status(201).json({
      data: { id: adminRegister.id, email: adminRegister.email },
      message: "Admin created successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const admin = await Admin.findOne({ email });

  if (admin) {
    const verified = bcrypt.compare(password, admin.password);
    if (verified) {
      const token = jwt.sign(
        { email: admin.email, id: admin._id, admin: true },
        process.env.TOKEN_ACCESS,
        { expiresIn: "2h" }
      );

      res.status(200).json({
        data: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
        },
        token,
        message: "Admin granted access.",
      });
    } else {
      res.status(403);
      throw new Error("Email or password is not valid.");
    }
  } else {
    res.status(404);
    throw new Error("Admin account not found.");
  }
});

const companyProfileCreate = asyncHandler(async (req, res) => {
  if (req?.user?.admin) {
    const user = req.user;
    const {
      company_name,
      industry,
      no_of_employees,
      locations,
      current_ris,
      challenges,
      reason_for_use,
      phone_number,
    } = req.body;

    if (!company_name || !phone_number || !industry || !locations) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    const admin = await Admin.findOne({ email: user?.email });

    const company = await companyProfile.findOne({ email: user?.email });

    if (company) {
      res.status(400);
      throw new Error("Profile already created.");
    }

    if (admin && !company) {
      const adminProfile = await companyProfile.create({
        email: user?.email,
        company_name,
        industry,
        no_of_employees,
        locations,
        current_ris,
        challenges,
        reason_for_use,
        phone_number,
      });

      if (adminProfile) {
        res.status(201).json({
          data: { id: adminProfile.id, company: adminProfile.company_name },
          message: "Admin profile created successfully.",
        });
      }
    }
  } else {
    res.status(403);
    throw new Error("Admin access required.");
  }
});

export { adminRegister, adminLogin, companyProfileCreate };
