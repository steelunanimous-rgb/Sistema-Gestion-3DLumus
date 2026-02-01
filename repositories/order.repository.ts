import { prisma } from '@/lib/prisma'
import type { Order } from '@prisma/client'
import type { OrderInput } from '@/lib/validations/order'

export class OrderRepository {
    async findAll() {
        return prisma.order.findMany({
            include: {
                customer: true,
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        })
    }

    async findById(id: string) {
        return prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                items: {
                    include: { product: true }
                }
            }
        })
    }

    async create(data: OrderInput) {
        const total = data.items.reduce((sum, item) => sum + (item.priceUnit * item.quantity), 0)

        return prisma.$transaction(async (tx) => {
            // 1. Create Order
            const order = await tx.order.create({
                data: {
                    customerId: data.customerId,
                    platform: data.platform,
                    status: data.status,
                    total: total,
                    items: {
                        create: data.items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            priceUnit: item.priceUnit,
                            subtotal: item.priceUnit * item.quantity
                        }))
                    }
                },
                include: { items: true }
            })

            // 2. Inventory Movements & stock update (if not cancelled)
            if (data.status !== 'cancelado') {
                for (const item of data.items) {
                    await tx.inventoryMovement.create({
                        data: {
                            productId: item.productId,
                            type: 'out',
                            quantity: item.quantity,
                            reason: 'venta'
                        }
                    })

                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stockCurrent: { decrement: item.quantity } }
                    })
                }
            }

            // 3. Finance Transaction (if delivered)
            if (data.status === 'entregado') {
                await tx.transaction.create({
                    data: {
                        type: 'ingreso',
                        category: 'Venta',
                        description: `Venta Pedido #${order.id.slice(0, 8)}`,
                        amount: total,
                        paymentMethod: 'Efectivo/Transferencia', // Default
                        date: new Date()
                    }
                })
            }

            return order
        })
    }

    async update(id: string, data: Partial<OrderInput>) {
        // Basic update for status/info
        // Note: complex updates (changing items) would need careful transaction management 
        // to reverse inventory/transactions. For now we focus on status updates.

        const existingOrder = await this.findById(id)
        if (!existingOrder) throw new Error('Order not found')

        return prisma.$transaction(async (tx) => {
            const order = await tx.order.update({
                where: { id },
                data: {
                    status: data.status,
                    platform: data.platform
                }
            })

            // Logic for status transition to 'entregado'
            if (existingOrder.status !== 'entregado' && data.status === 'entregado') {
                await tx.transaction.create({
                    data: {
                        type: 'ingreso',
                        category: 'Venta',
                        description: `Venta Pedido #${id.slice(0, 8)}`,
                        amount: existingOrder.total,
                        paymentMethod: 'Efectivo/Transferencia',
                        date: new Date()
                    }
                })
            }

            return order
        })
    }
}

export const orderRepository = new OrderRepository()
