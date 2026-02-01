import { NextResponse } from 'next/server'
import { orderService } from '@/services/order.service'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        const order = await orderService.updateOrder(params.id, body)
        return NextResponse.json(order)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
