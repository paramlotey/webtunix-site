// lib/prisma.ts
import { PrismaClient } from '@/lib/generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    log:['error']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Graceful shutdown handlers
const cleanup = async () => {
  await prisma.$disconnect()
}

process.on('beforeExit', cleanup)
process.on('SIGINT', async () => {
  await cleanup()
  process.exit(0)
})
process.on('SIGTERM', async () => {
  await cleanup()
  process.exit(0)
})