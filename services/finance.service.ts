import { prisma } from '@/lib/prisma'
import type { TransactionInput } from '@/lib/validations/transaction'

export class FinanceService {
    async getAllTransactions() {
        const transactions = await prisma.transaction.findMany({
            orderBy: { date: 'desc' }
        })

        const ingresos = transactions.filter(t => t.type === 'ingreso').reduce((sum, t) => sum + t.amount.toNumber(), 0)
        const gastos = transactions.filter(t => t.type === 'gasto').reduce((sum, t) => sum + t.amount.toNumber(), 0)
        const balance = ingresos - gastos
        const roi = gastos > 0 ? (balance / gastos) * 100 : 0

        return { transactions, stats: { ingresos, gastos, balance, roi } }
    }

    async createTransaction(data: TransactionInput) {
        return prisma.transaction.create({
            data: {
                ...data,
                date: new Date(data.date)
            }
        })
    }
}

export const financeService = new FinanceService()
