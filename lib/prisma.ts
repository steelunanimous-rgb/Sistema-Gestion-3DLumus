import { PrismaClient } from '@prisma/client'

const prismaClientOptions: any = {}

const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!dbUrl) {
    console.warn("CRITICAL: Neither DATABASE_URL nor POSTGRES_URL is defined!");
} else {
    prismaClientOptions.datasources = {
        db: {
            url: dbUrl,
        },
    }
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
