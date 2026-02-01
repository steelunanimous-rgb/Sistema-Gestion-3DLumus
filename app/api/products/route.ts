import { NextRequest, NextResponse } from 'next/server'
import { productService } from '@/services/product.service'
import { createProductSchema } from '@/lib/validations/product'

/**
 * GET /api/products
 * Obtener todos los productos y estadísticas
 */
export async function GET() {
    try {
        const data = await productService.getAllProducts()
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error al obtener productos', message: error.message },
            { status: 500 }
        )
    }
}

/**
 * POST /api/products
 * Crear un nuevo producto
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        // Validar con Zod
        const validatedData = createProductSchema.parse(body)

        const product = await productService.createProduct(validatedData)

        return NextResponse.json(product, { status: 201 })
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Datos de validación inválidos', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Error al crear producto', message: error.message },
            { status: 500 }
        )
    }
}
