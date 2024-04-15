import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.HOTMAIL_EMAIL,
      pass: process.env.HOTMAIL_PASSWORD,
    },
  });
  return transporter;
};

export default createTransporter;
