import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const movements = await prisma.inventoryMovement.findMany({
            include: { product: true },
            orderBy: { createdAt: 'desc' },
            take: 20
        })
        return NextResponse.json(movements)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
