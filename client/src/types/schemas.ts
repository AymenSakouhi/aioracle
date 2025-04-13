import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'this field needs to be filled.' })
    .email('This is not a valid email'),
  password: z.string().min(8, {
    message: 'this field should be of 8 characters and its required',
  }),
})

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'This field needs to be there' }),
  email: z
    .string()
    .min(1, { message: 'this field needs to be filled.' })
    .email('This is not a valid email'),
  password: z.string().min(8, {
    message: 'this field should be of 8 characters and its required',
  }),
})
