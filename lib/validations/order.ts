import { z } from 'zod'

export const orderItemSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    priceUnit: z.number().positive(),
})

export const orderSchema = z.object({
    customerId: z.string().uuid(),
    platform: z.enum(['facebook', 'instagram', 'tiktok']),
    status: z.enum(['pendiente', 'en_produccion', 'entregado', 'cancelado']),
    items: z.array(orderItemSchema).min(1, 'Debe agregar al menos un producto'),
})

export type OrderInput = z.infer<typeof orderSchema>
export type OrderItemInput = z.infer<typeof orderItemSchema>
