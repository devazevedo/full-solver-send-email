import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export interface SendEmailFormDTO {
  email: string;
  subject: string;
  text: string;
}

export async function sendEmailPasswordUseCase({ email, subject, text }: SendEmailFormDTO) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'suporte@fullsolver.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: 'suporte@fullsolver.com',
    to: email,
    subject,
    text
  };

  let info = await transporter.sendMail(mailOptions);
  return info;
}