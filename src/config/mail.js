import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: process.env.DB_MAIL_SERVICE,
  host: process.env.DB_MAIL_HOST,
  port: process.env.DB_MAIL_PORT,
  secure: process.env.DB_MAIL_SECURE,
  auth: {
    user: process.env.DB_MAIL_USER,
    pass: process.env.DB_MAIL_PASS,
  },
});