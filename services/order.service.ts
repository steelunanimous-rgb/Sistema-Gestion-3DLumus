import { orderRepository } from '@/repositories/order.repository'

export class OrderService {
    async getAllOrders() {
        const orders = await orderRepository.findAll()

        const stats = {
            total: orders.length,
            pendientes: orders.filter(o => o.status === 'pendiente').length,
            enProduccion: orders.filter(o => o.status === 'en_produccion').length,
            entregados: orders.filter(o => o.status === 'entregado').length,
        }

        return { orders, stats }
    }

    async createOrder(data: any) {
        return orderRepository.create(data)
    }

    async updateOrder(id: string, data: any) {
        return orderRepository.update(id, data)
    }
}

export const orderService = new OrderService()
