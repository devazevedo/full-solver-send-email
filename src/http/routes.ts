import { FastifyInstance } from "fastify";
import { sendEmailForm, sendEmailPassword } from "./controllers/emails";

export async function appRoutes(app: FastifyInstance) {
  app.post("/send-email", sendEmailForm);
  app.post("/send-email-password", sendEmailPassword);
}