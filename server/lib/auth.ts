import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '../lib/generated/prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  trustedOrigins: ['http://localhost:5173'],
})
