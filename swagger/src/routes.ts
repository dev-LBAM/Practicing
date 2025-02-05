import { FastifyInstance } from "fastify";
import { UserSchema, UserType } from "./schema";

const users: UserType[] = [];

export async function userRoutes(app: FastifyInstance) {
  // Criar usuário
  app.post(
    "/",
    {
      schema: {
        summary: "Criar usuário",
        description: "Cria um novo usuário no sistema",
        tags: ["Usuários"],
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
          required: ["name", "email"],
        },
        response: {
          201: {
            description: "Usuário criado",
            type: "object",
            properties: {
              message: { type: "string" },
              user: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const parsedUser = UserSchema.safeParse(request.body);
      if (!parsedUser.success) {
        return reply.status(400).send({ error: parsedUser.error.errors });
      }

      users.push(parsedUser.data);
      return reply.status(201).send({
        message: "Usuário criado com sucesso",
        user: parsedUser.data,
      });
    }
  );

  // Listar usuários
  app.get(
    "/",
    {
      schema: {
        summary: "Listar usuários",
        description: "Retorna a lista de usuários cadastrados",
        tags: ["Usuários"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
              },
            },
          },
        },
      },
    },
    async () => {
      return users;
    }
  );
}
