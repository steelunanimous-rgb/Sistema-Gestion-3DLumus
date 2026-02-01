import { prisma } from '@/lib/prisma'
import type { Product } from '@prisma/client'
import type { CreateProductInput, UpdateProductInput } from '@/lib/validations/product'

/**
 * Repository para manejar operaciones de base de datos de productos
 * Esta capa abstrae Prisma del resto de la aplicación
 */
export class ProductRepository {
    /**
     * Obtener todos los productos
     */
    async findAll(): Promise<Product[]> {
        return prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    /**
     * Obtener producto por ID
     */
    async findById(id: string): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { id },
        })
    }

    /**
     * Crear nuevo producto
     */
    async create(data: CreateProductInput): Promise<Product> {
        return prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                priceSale: data.priceSale,
                costProduction: data.costProduction,
                category: data.category ?? 'PRODUCTO',
                unit: data.unit ?? 'unidades',
                stockCurrent: data.stockCurrent,
                stockMin: data.stockMin,
                active: data.active ?? true,
            },
        })
    }

    /**
     * Actualizar producto existente
     */
    async update(id: string, data: UpdateProductInput): Promise<Product> {
        return prisma.product.update({
            where: { id },
            data,
        })
    }

    /**
     * Eliminar producto
     */
    async delete(id: string): Promise<Product> {
        return prisma.product.delete({
            where: { id },
        })
    }

    /**
     * Verificar si hay productos con stock bajo
     */
    async findLowStock(): Promise<Product[]> {
        return prisma.product.findMany({
            where: {
                stockCurrent: {
                    lte: prisma.product.fields.stockMin,
                },
                active: true,
            },
        })
    }

    /**
     * Buscar productos por nombre
     */
    async search(query: string): Promise<Product[]> {
        return prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        })
    }
}

// Exportar instancia singleton
export const productRepository = new ProductRepository()
