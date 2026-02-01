import { prisma } from '@/lib/prisma'
import type { Customer } from '@prisma/client'
import type { CustomerInput } from '@/lib/validations/customer'

export class CustomerRepository {
    async findAll(): Promise<Customer[]> {
        return prisma.customer.findMany({
            include: {
                _count: {
                    select: { orders: true }
                },
                orders: {
                    select: { total: true, createdAt: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { createdAt: 'desc' }
        })
    }

    async findById(id: string): Promise<Customer | null> {
        return prisma.customer.findUnique({
            where: { id },
            include: { orders: true }
        })
    }

    async create(data: CustomerInput): Promise<Customer> {
        return prisma.customer.create({ data })
    }

    async update(id: string, data: CustomerInput): Promise<Customer> {
        return prisma.customer.update({
            where: { id },
            data
        })
    }

    async delete(id: string): Promise<Customer> {
        return prisma.customer.delete({ where: { id } })
    }
}

export const customerRepository = new CustomerRepository()
