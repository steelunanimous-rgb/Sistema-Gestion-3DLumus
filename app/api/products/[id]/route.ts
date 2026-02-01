import { NextRequest, NextResponse } from 'next/server'
import { productService } from '@/services/product.service'
import { updateProductSchema } from '@/lib/validations/product'

/**
 * GET /api/products/[id]
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const product = await productService.getProductById(params.id)
        if (!product) {
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
        }
        return NextResponse.json(product)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

/**
 * PUT /api/products/[id]
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json()
        const validatedData = updateProductSchema.parse(body)

        const product = await productService.updateProduct(params.id, validatedData)
        return NextResponse.json(product)
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validación fallida', details: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

/**
 * DELETE /api/products/[id]
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await productService.deleteProduct(params.id)
        return NextResponse.json({ message: 'Producto eliminado correctamente' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
