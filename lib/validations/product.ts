import { z } from 'zod'

/**
 * Schema para crear un producto
 */
export const createProductSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
    description: z.string().optional(),
    priceSale: z.number().positive('El precio de venta debe ser mayor a 0'),
    costProduction: z.number().positive('El costo de producción debe ser mayor a 0'),
    category: z.enum(['PRODUCTO', 'MATERIAL']).default('PRODUCTO'),
    unit: z.string().default('unidades'),
    stockCurrent: z.number().int().min(0, 'El stock no puede ser negativo'),
    stockMin: z.number().int().min(0, 'El stock mínimo no puede ser negativo'),
    active: z.boolean().default(true),
})

/**
 * Schema para actualizar un producto
 */
export const updateProductSchema = createProductSchema.partial()

/**
 * Tipos TypeScript inferidos de los schemas
 */
export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
