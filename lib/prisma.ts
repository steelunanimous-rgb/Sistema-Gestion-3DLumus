import { PrismaClient } from '@prisma/client'

const prismaClientOptions: any = {}

const dbUrl = process.env.ORACLE_DATABASE_URL || process.env.DATABASE_URL;

if (!dbUrl) {
    console.warn("DEBUG: No DB URL found in any expected variable");
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
