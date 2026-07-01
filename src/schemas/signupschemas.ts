import { z } from "zod";

export const usernameVaidation = z
  .string()
  .min(2, "must be atleast of 2 characters")
  .max(20, "no more then 20")
  .regex(/^[a-zA-Z0-9._-]{3,16}$/, "must contain only allowed characters");

  export const signupSchema = z.object({
    username : usernameVaidation,
    email: z.string().email({message:"invalid email address"}),
  })