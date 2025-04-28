import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(3).max(60),
  email: z.string().email(),
  address: z.string().max(400),
  password: z.string()
    .min(8)
    .max(16)
    .regex(/[A-Z]/, "Must include one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must include one special character")
})

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string()
})