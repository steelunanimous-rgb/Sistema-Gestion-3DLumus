import { z } from 'zod'

export const customerSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    phone: z.string().min(8, 'Teléfono inválido'),
    socialMedia: z.string().min(1, 'La red social es requerida'),
})

export type CustomerInput = z.infer<typeof customerSchema>
