import { productRepository } from '@/repositories/product.repository'
import type { Product } from '@prisma/client'
import type { CreateProductInput, UpdateProductInput } from '@/lib/validations/product'

/**
 * Service para manejar la lógica de negocio de productos
 * Esta capa puede contener validaciones adicionales, cálculos, etc.
 */
export class ProductService {
    /**
     * Obtener todos los productos con estadísticas
     */
    async getAllProducts() {
        const products = await productRepository.findAll()

        // Calcular estadísticas
        const totalProducts = products.filter(p => (p as any).category === 'PRODUCTO').length
        const totalMaterials = products.filter(p => (p as any).category === 'MATERIAL').length
        const lowStockCount = products.filter(p => p.stockCurrent <= p.stockMin).length

        // El valor del inventario: 
        // Para productos: precio de venta x stock
        // Para materiales: costo de producción x stock
        const totalInventoryValue = products.reduce((sum, p) => {
            const price = (p as any).category === 'PRODUCTO' ? p.priceSale.toNumber() : p.costProduction.toNumber()
            return sum + (price * p.stockCurrent)
        }, 0)

        return {
            products,
            stats: {
                totalProducts,
                totalMaterials,
                lowStockCount,
                totalInventoryValue,
            },
        }
    }

    /**
     * Obtener producto por ID
     */
    async getProductById(id: string): Promise<Product | null> {
        return productRepository.findById(id)
    }

    /**
     * Crear nuevo producto
     */
    async createProduct(data: CreateProductInput): Promise<Product> {
        // Validación de negocio: para PRODUCTO el precio de venta debe ser mayor al costo
        if (data.category === 'PRODUCTO' && data.priceSale <= data.costProduction) {
            throw new Error('El precio de venta debe ser mayor al costo de producción para productos finalizados')
        }

        return productRepository.create(data)
    }

    /**
     * Actualizar producto
     */
    async updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
        // Verificar que el producto existe
        const existingProduct = await productRepository.findById(id)
        if (!existingProduct) {
            throw new Error('Producto no encontrado')
        }

        // Validación: si se actualizan precios y es un producto, validar que tenga sentido
        const category = data.category || (existingProduct as any).category
        const priceSale = data.priceSale || existingProduct.priceSale.toNumber()
        const costProduction = data.costProduction || existingProduct.costProduction.toNumber()

        if (category === 'PRODUCTO' && priceSale <= costProduction) {
            throw new Error('El precio de venta debe ser mayor al costo de producción para productos finalizados')
        }

        return productRepository.update(id, data)
    }

    /**
     * Eliminar producto
     */
    async deleteProduct(id: string): Promise<Product> {
        // Verificar que el producto existe
        const existingProduct = await productRepository.findById(id)
        if (!existingProduct) {
            throw new Error('Producto no encontrado')
        }

        // TODO: Verificar que no tenga pedidos asociados antes de eliminar
        // Por ahora, solo eliminamos

        return productRepository.delete(id)
    }

    /**
     * Buscar productos
     */
    async searchProducts(query: string) {
        return productRepository.search(query)
    }

    /**
     * Obtener productos con stock bajo
     */
    async getLowStockProducts() {
        return productRepository.findLowStock()
    }

    /**
     * Calcular margen de ganancia de un producto
     */
    calculateMargin(product: Product): { amount: number; percentage: number } {
        const amount = product.priceSale.toNumber() - product.costProduction.toNumber()
        const percentage = (amount / product.priceSale.toNumber()) * 100

        return {
            amount,
            percentage: Math.round(percentage),
        }
    }
}

// Exportar instancia singleton
export const productService = new ProductService()
