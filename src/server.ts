import fastify from "fastify";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fastifyCors from "@fastify/cors";

dotenv.config();

const app = fastify();

app.register(fastifyCors, {}); // habilita o CORS para todas as rotas

interface Email {
  subject: string;
  text: string;
}

async function sendEmail(subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fullsolverstartup@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: 'fullsolverstartup@gmail.com',
    to: 'atendimento@fullsolver.com',
    subject,
    text
  };

  let info = await transporter.sendMail(mailOptions);
  return info;
}

app.post('/send-email', async (request, reply) => {
  let email = request.body as Email;

  try {
    let info = await sendEmail(email.subject, email.text);
    reply.send({ message: 'Email enviado com sucesso!', info: info });
  } catch (error) {
    reply.send({ message: 'Falha ao enviar o email.', error: error });
  }
});

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 2323
}).then(() => {
  console.log('Server is running');
})