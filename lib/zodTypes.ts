import { z } from "zod";

export const NumberSchema = z.object({
  number: z.string().min(10, "Number must be atleast 10 Characters Long!").max(10, "Number cannot be longer than 10 Characters!"),
});

export type TNumberSchema = z.infer<typeof NumberSchema>;