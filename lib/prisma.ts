import { PrismaClient } from '@prisma/client'

const prismaClientOptions: any = {}

if (process.env.DATABASE_URL) {
    prismaClientOptions.datasources = {
        db: {
            url: process.env.DATABASE_URL,
        },
    }
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
