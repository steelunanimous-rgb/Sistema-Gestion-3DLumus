import { NextResponse } from 'next/server'
import { customerService } from '@/services/customer.service'
import { customerSchema } from '@/lib/validations/customer'

export async function GET() {
    try {
        const data = await customerService.getAllCustomers()
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validated = customerSchema.parse(body)
        const customer = await customerService.createCustomer(validated)
        return NextResponse.json(customer, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
