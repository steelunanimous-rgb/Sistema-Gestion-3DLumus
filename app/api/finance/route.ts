import { NextResponse } from 'next/server'
import { financeService } from '@/services/finance.service'
import { transactionSchema } from '@/lib/validations/transaction'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const data = await financeService.getAllTransactions()
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validated = transactionSchema.parse(body)
        const transaction = await financeService.createTransaction(validated)
        return NextResponse.json(transaction, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
