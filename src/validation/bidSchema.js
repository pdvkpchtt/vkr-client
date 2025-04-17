import * as z from "zod";

export const BidSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Поле обязательно для заполнения" }),
});
