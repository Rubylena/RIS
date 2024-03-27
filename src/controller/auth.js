import asyncHandler from "express-async-handler";
import admin from "../model/register.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { company_name, type_of_company, email, phone_number, password } =
    req.body;

  if (
    !company_name ||
    !type_of_company ||
    !email ||
    !phone_number ||
    !password
  ) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const user = await admin.findOne({email});

  if (user) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminRegister = await admin.create({
    company_name,
    type_of_company,
    email,
    phone_number,
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

export { register };
