import { NextResponse } from 'next/server'
import { customerService } from '@/services/customer.service'
import { customerSchema } from '@/lib/validations/customer'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        const validated = customerSchema.parse(body)
        const customer = await customerService.updateCustomer(params.id, validated)
        return NextResponse.json(customer)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await customerService.deleteCustomer(params.id)
        return NextResponse.json({ message: 'Cliente eliminado' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
