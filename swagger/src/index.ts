import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import { userRoutes } from "./routes"

const app = Fastify();

// Habilita CORS para permitir chamadas do frontend
app.register(cors);

// Configuração do Swagger
app.register(swagger, {
  openapi: {
    info: {
      title: "API de Usuários",
      description: "API para gerenciar usuários",
      version: "1.0.0",
    },
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  staticCSP: true,
});

// Registra as rotas de usuários
app.register(userRoutes, { prefix: "/users" });

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("🚀 Servidor rodando em http://localhost:3000");
    console.log("📄 Documentação disponível em http://localhost:3000/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
