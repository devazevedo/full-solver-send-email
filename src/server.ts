import { app } from "@/app";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

// Configurar o plugin CORS
app.register(fastifyCors, {
  origin: "*", // Permitir apenas esta origem
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"] // Cabeçalhos permitidos
});

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 2323
}).then(() => {
  console.log("Server is running on port " + process.env.PORT || 2323);
});