import { z } from 'zod'

import { loginSchema, registerSchema } from './schemas'

export type loginSchemaType = z.infer<typeof loginSchema>

export type registerSchemaType = z.infer<typeof registerSchema>
