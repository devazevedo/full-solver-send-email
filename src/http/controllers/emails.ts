import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { sendEmailFormUseCase } from "@/use-cases/send-email-form";
import { sendEmailPasswordUseCase } from "@/use-cases/send-email-password";

export async function sendEmailForm(req: FastifyRequest, res: FastifyReply) {

  const Email = z.object({
    subject: z.string(),
    text: z.string()
  });

  const {subject, text} = Email.parse(req.body);

  try {
    const info = await sendEmailFormUseCase({ text, subject });
    return res.status(201).send({ message: 'Email enviado com sucesso!', info: info });
  } catch (error) {
    return res.status(500).send({ message: 'Falha ao enviar o email.', error: error });
  }
};

export async function sendEmailPassword(req: FastifyRequest, res: FastifyReply) {
  const Email = z.object({
    email: z.string(),
    subject: z.string(),
    text: z.string()
  });

  const {email, subject, text} = Email.parse(req.body);

  try {
    const info = await sendEmailPasswordUseCase({ email, subject, text });
    return res.status(201).send({ message: 'Email enviado com sucesso!', info: info });
  } catch (error) {
    return res.status(500).send({ message: 'Falha ao enviar o email.', error: error });
  }
};
