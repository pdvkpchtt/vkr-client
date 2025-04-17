import * as z from "zod";

export const HistorySchema = z.object({
  run: z.string().min(1, { message: "Поле обязательно для заполнения" }),
  description: z
    .string()
    .min(1, { message: "Поле обязательно для заполнения" }),
});
