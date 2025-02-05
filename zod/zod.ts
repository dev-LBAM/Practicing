import { z } from 'zod'

const zodSchema = z.object({
    name: z.string().min(2, "minimo 3 caracteres"),
    age: z.number().int("Number dont is inter").positive("Number dont is positve"),
    email: z.string().email("Email Invalid!"),
    check: z.boolean()
})

const resultSchema = zodSchema.safeParse({
    name: "Lucas",
    age: 2.2,
    email: "lucas",
    check: false
})



console.log(resultSchema.error?.format())