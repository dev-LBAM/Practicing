"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var zodSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "minimo 3 caracteres"),
    age: zod_1.z.number().int("Number dont is inter").positive("Number dont is positve"),
    email: zod_1.z.string().email("Email Invalid!").min(20, "min charecter 20"),
    check: zod_1.z.boolean()
});
var resultSchema = zodSchema.safeParse({
    name: "Lucas",
    age: -2.2,
    email: "lucas",
    check: false
});
console.log((_a = resultSchema.error) === null || _a === void 0 ? void 0 : _a.format());
