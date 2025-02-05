// ## 🔹 1. Validação de Formulários (Frontend e Backend)
// - Garantir que os usuários preencham os campos corretamente antes de enviar os dados.
// - Exibir mensagens de erro amigáveis para o usuário.
// - Evitar que dados inválidos sejam enviados para o backend.

// 📌 **Exemplo:**  
// ```ts
const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  age: z.number().int().positive(),
});
// ```

// // ---

// // ## 🔹 2. Validação de Requisições HTTP (Backend)
// // - Validar `req.body`, `req.params` e `req.query` antes de processar a requisição.
// // - Evitar requisições com dados malformados ou inválidos.

// // 📌 **Exemplo com Express.js:**  
// // ```ts
app.post("/user", (req, res) => {
  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.format());
  }
  res.status(200).send("Usuário válido");
});
``

// ## 🔹 3. Validação de Respostas de API (Frontend e Backend)
// - Garantir que os dados recebidos de uma API externa estão no formato esperado.
// - Prevenir falhas ao exibir informações no frontend devido a dados inesperados.

// 📌 **Exemplo:**  

const apiResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
});

fetch("/api/product")
  .then(res => res.json())
  .then(data => {
    const result = apiResponseSchema.safeParse(data);
    if (!result.success) {
      console.error("Erro na resposta da API", result.error);
    }
  });
``

// ## 🔹 4. Validação de Dados do Banco de Dados
// - Garantir que os dados enviados ao banco estejam corretos antes de salvar.
// - Trabalhar em conjunto com **ORMS** (como Prisma, TypeORM, Sequelize).

// 📌 **Exemplo com Prisma:**  

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

const userData = userSchema.parse({ name: "João", email: "joao@email.com" });

await prisma.user.create({ data: userData });
// ```

// ---

// ## 🔹 5. Validação de Configuração e Variáveis de Ambiente
// - Evitar falhas na aplicação devido a valores ausentes ou malformados no `.env`.
// - Tipar corretamente as configurações.

// 📌 **Exemplo:**  
// ```ts
const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(10),
});

const config = configSchema.parse(process.env);
// ```

// ---

// ## 🔹 6. Validação de Dados em Fila de Processamento (RabbitMQ, Redis, BullMQ, etc.)
// - Garantir que as mensagens enviadas para filas estão corretas antes de serem processadas.

// 📌 **Exemplo:**  
// ```ts
const orderSchema = z.object({
  orderId: z.string(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().positive() })),
});

function processOrder(message) {
  const validation = orderSchema.safeParse(message);
  if (!validation.success) {
    console.error("Erro nos dados da fila", validation.error);
    return;
  }
  console.log("Processando pedido:", validation.data);
}
// ```

// ---

// ## 🔹 7. Validação de Dados de Cache (Redis, Memcached, LocalStorage)
// - Garantir que os dados armazenados e recuperados do cache estão no formato correto.

// 📌 **Exemplo com Redis:**  
// ```ts
const sessionSchema = z.object({
  userId: z.string(),
  lastLogin: z.date(),
});

const sessionData = JSON.parse(redis.get("userSession") || "{}");

const result = sessionSchema.safeParse(sessionData);
if (!result.success) {
  console.error("Erro ao recuperar sessão", result.error);
}
// ```

// ---

// ## 🔹 8. Validação de Parâmetros de URL e Query String
// - Garantir que os parâmetros passados na URL estejam no formato esperado.

// 📌 **Exemplo:**  
// ```ts
const paramsSchema = z.object({
  userId: z.string().uuid(),
  page: z.string().transform(Number).int().positive(),
});

const result = paramsSchema.safeParse(req.params);
if (!result.success) {
  res.status(400).json(result.error);
}
// ```

// ---

// ## 🔹 9. Tipagem e Validação de Objetos Complexos
// - Validar objetos aninhados e estruturas complexas.

// 📌 **Exemplo:**  
// ```ts
const userSchema = z.object({
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string().length(5),
  }),
});
// ```

// ---

// ## 🔹 10. Validação de WebSockets (Socket.IO, WS)
// - Garantir que os dados enviados e recebidos via WebSockets estão corretos.

// 📌 **Exemplo:**  
// ```ts
const messageSchema = z.object({
  userId: z.string(),
  content: z.string().min(1),
});

socket.on("message", (data) => {
  const result = messageSchema.safeParse(data);
  if (!result.success) {
    console.error("Mensagem inválida", result.error);
  }
});
// ```

// ---

// ## 🚀 Conclusão
// O **Zod** é uma ferramenta extremamente poderosa para validar, transformar e estruturar dados, podendo ser usada **em praticamente qualquer lugar** onde você precise garantir que os dados estejam corretos. Ele pode ser aplicado em **APIs, bancos de dados, cache, filas, WebSockets, validação de formulários, configuração e muito mais**!

// Se quiser mais detalhes sobre algum desses cenários, estude os exemplos e pratique no seu código! 🚀🔥

