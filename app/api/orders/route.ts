import { NextResponse } from 'next/server'
import { orderService } from '@/services/order.service'
import { orderSchema } from '@/lib/validations/order'

export async function GET() {
    try {
        const data = await orderService.getAllOrders()
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validated = orderSchema.parse(body)
        const order = await orderService.createOrder(validated)
        return NextResponse.json(order, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
