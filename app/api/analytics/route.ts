import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfMonth, subMonths, format, endOfMonth } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // 1. Get overall metrics
        const [orders, products, transactions] = await Promise.all([
            prisma.order.findMany({
                where: { NOT: { status: 'cancelado' } },
                select: { total: true, status: true, platform: true, createdAt: true }
            }),
            prisma.product.findMany({}),
            prisma.transaction.findMany({ orderBy: { date: 'desc' } })
        ])

        const totalIncome = transactions
            .filter(t => t.type === 'ingreso')
            .reduce((sum, t) => sum + t.amount.toNumber(), 0)

        const totalExpenses = transactions
            .filter(t => t.type === 'gasto')
            .reduce((sum, t) => sum + t.amount.toNumber(), 0)

        const netProfit = totalIncome - totalExpenses
        const roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0

        // 2. Performance by month (last 6 months)
        const monthlyPerformance = []
        for (let i = 5; i >= 0; i--) {
            const monthStart = startOfMonth(subMonths(new Date(), i))
            const monthEnd = endOfMonth(subMonths(new Date(), i))

            const monthIncome = transactions
                .filter(t => t.type === 'ingreso' && t.date >= monthStart && t.date <= monthEnd)
                .reduce((sum, t) => sum + t.amount.toNumber(), 0)

            const monthExpenses = transactions
                .filter(t => t.type === 'gasto' && t.date >= monthStart && t.date <= monthEnd)
                .reduce((sum, t) => sum + t.amount.toNumber(), 0)

            monthlyPerformance.push({
                month: format(monthStart, 'MMM'),
                ventas: monthIncome,
                gastos: monthExpenses,
                utilidad: monthIncome - monthExpenses
            })
        }

        // 3. Platform Distribution
        const platforms = ['facebook', 'instagram', 'tiktok']
        const platformDistribution = platforms.map(p => {
            const pOrders = orders.filter(o => o.platform === p)
            const count = pOrders.length
            const percentage = orders.length > 0 ? Math.round((count / orders.length) * 100) : 0
            return { platform: p, count, percentage }
        })

        // 4. Products by profit margin (top 5)
        const productPerformance = products
            .filter(p => (p as any).category === 'PRODUCTO')
            .map(p => {
                const margin = p.priceSale.toNumber() - p.costProduction.toNumber()
                const percentage = p.priceSale.toNumber() > 0 ? (margin / p.priceSale.toNumber()) * 100 : 0
                return { name: p.name, margin: Math.round(percentage) }
            })
            .sort((a, b) => b.margin - a.margin)
            .slice(0, 5)

        return NextResponse.json({
            metrics: {
                totalIncome,
                totalExpenses,
                netProfit,
                roi: Math.round(roi)
            },
            monthlyPerformance,
            platformDistribution,
            productPerformance
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
