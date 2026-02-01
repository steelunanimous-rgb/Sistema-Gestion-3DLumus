import { z } from 'zod'

export const transactionSchema = z.object({
    type: z.enum(['ingreso', 'gasto']),
    category: z.string().min(1, 'La categoría es requerida'),
    description: z.string().optional(),
    amount: z.number().positive('El monto debe ser positivo'),
    paymentMethod: z.string().min(1, 'El método de pago es requerido'),
    date: z.string().or(z.date()),
})

export type TransactionInput = z.infer<typeof transactionSchema>
