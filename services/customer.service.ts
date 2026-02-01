import { customerRepository } from '@/repositories/customer.repository'
import { prisma } from '@/lib/prisma'

export class CustomerService {
    async getAllCustomers() {
        const customers = await customerRepository.findAll()

        // Process stats for UI
        const processedCustomers = await Promise.all(customers.map(async (c: any) => {
            // Get total spent by summing up order totals
            const aggregate = await prisma.order.aggregate({
                where: { customerId: c.id },
                _sum: { total: true }
            })

            return {
                ...c,
                orderCount: c._count.orders,
                totalSpent: aggregate._sum.total?.toNumber() || 0,
                lastOrder: c.orders[0]?.createdAt || null
            }
        }))

        const stats = {
            totalCustomers: processedCustomers.length,
            activeCustomers: processedCustomers.filter(c => c.orderCount > 0).length,
            averageValue: processedCustomers.length > 0
                ? processedCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / processedCustomers.length
                : 0
        }

        return { customers: processedCustomers, stats }
    }

    async createCustomer(data: any) {
        return customerRepository.create(data)
    }

    async updateCustomer(id: string, data: any) {
        return customerRepository.update(id, data)
    }

    async deleteCustomer(id: string) {
        return customerRepository.delete(id)
    }
}

export const customerService = new CustomerService()
