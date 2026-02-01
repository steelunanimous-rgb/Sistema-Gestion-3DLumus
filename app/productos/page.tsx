'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Plus, Search, AlertTriangle, Edit, Trash2, Package, Loader2, Layers, Wrench } from 'lucide-react'
import ProductModal from '@/components/products/ProductModal'
import { formatCurrency } from '@/lib/utils'

interface Product {
    id: string
    name: string
    description: string | null
    priceSale: any
    costProduction: any
    category: 'PRODUCTO' | 'MATERIAL'
    unit: string
    stockCurrent: number
    stockMin: number
    active: boolean
}

interface Stats {
    totalProducts: number
    totalMaterials: number
    lowStockCount: number
    totalInventoryValue: number
}

export default function ProductosPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [stats, setStats] = useState<Stats>({
        totalProducts: 0,
        totalMaterials: 0,
        lowStockCount: 0,
        totalInventoryValue: 0,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState<string>('ALL')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/products')
            if (!res.ok) throw new Error('Error al cargar productos')
            const data = await res.json()
            setProducts(data.products)
            setStats(data.stats)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchProducts() }, [fetchProducts])

    const handleCreate = async (data: any) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Error al crear producto')
            }
            await fetchProducts()
            setIsModalOpen(false)
        } catch (err: any) {
            alert(err.message)
        }
    }

    const handleUpdate = async (data: any) => {
        if (!editingProduct) return
        try {
            const res = await fetch(`/api/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Error al actualizar')
            }
            await fetchProducts()
            setIsModalOpen(false)
            setEditingProduct(null)
        } catch (err: any) {
            alert(err.message)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar?')) return
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Error al eliminar')
            await fetchProducts()
        } catch (err: any) {
            alert(err.message)
        }
    }

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === 'ALL' || p.category === filterCategory
        return matchesSearch && matchesCategory
    })

    if (loading && products.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-text-muted">
                <Loader2 size={48} className="animate-spin mb-4 text-accent-primary" />
                <p>Cargando catálogo...</p>
            </div>
        )
    }

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Inventario y Productos</h1>
                    <p className="text-text-muted">Gestión integral de materiales y productos terminados</p>
                </div>
                <button onClick={() => { setEditingProduct(null); setIsModalOpen(true) }} className="btn-primary flex items-center gap-2 w-full lg:w-auto justify-center">
                    <Plus size={20} /> Nuevo Ítem
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatCardSmall icon={<Package className="text-accent-primary" />} title="Productos" value={stats.totalProducts} />
                <StatCardSmall icon={<Layers className="text-warning" />} title="Materiales" value={stats.totalMaterials} />
                <StatCardSmall icon={<AlertTriangle className="text-danger" />} title="Stock Bajo" value={stats.lowStockCount} />
                <StatCardSmall icon={<Package className="text-success" />} title="Valor Inv." value={formatCurrency(stats.totalInventoryValue)} />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input w-full pl-10" />
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setFilterCategory('ALL')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterCategory === 'ALL' ? 'bg-accent-primary text-white' : 'bg-bg-secondary text-text-muted'}`}>Todos</button>
                    <button onClick={() => setFilterCategory('PRODUCTO')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterCategory === 'PRODUCTO' ? 'bg-accent-primary text-white' : 'bg-bg-secondary text-text-muted'}`}>Productos</button>
                    <button onClick={() => setFilterCategory('MATERIAL')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterCategory === 'MATERIAL' ? 'bg-accent-primary text-white' : 'bg-bg-secondary text-text-muted'}`}>Materiales</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                    const isLowStock = product.stockCurrent <= product.stockMin
                    const isMaterial = product.category === 'MATERIAL'

                    return (
                        <div key={product.id} className="card-hover">
                            <div className="bg-bg-secondary rounded-lg h-32 mb-4 flex items-center justify-center relative overflow-hidden group">
                                {isMaterial ? <Wrench size={40} className="text-warning opacity-50" /> : <Package size={40} className="text-accent-primary opacity-50" />}
                                <div className="absolute top-2 left-2">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${isMaterial ? 'bg-warning/20 text-warning' : 'bg-accent-primary/20 text-accent-primary'}`}>
                                        {isMaterial ? 'Material' : 'Producto'}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-text-primary mb-1 truncate">{product.name}</h3>
                            <p className="text-xs text-text-muted mb-4 line-clamp-2 h-8">{product.description || 'Sin descripción'}</p>

                            <div className="mb-4">
                                <span className={`badge ${isLowStock ? 'badge-warning' : 'badge-success'} flex items-center gap-1 w-fit`}>
                                    {isLowStock && <AlertTriangle size={12} />}
                                    Stock: {product.stockCurrent} {product.unit}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border-subtle">
                                <div>
                                    <p className="text-[10px] text-text-muted uppercase mb-1">{isMaterial ? 'Costo Compra' : 'Precio Venta'}</p>
                                    <p className={`text-lg font-bold ${isMaterial ? 'text-text-primary' : 'text-accent-primary'}`}>
                                        {formatCurrency(Number(isMaterial ? product.costProduction : product.priceSale))}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-text-muted uppercase mb-1">Mínimo</p>
                                    <p className="text-sm font-medium">{product.stockMin} {product.unit}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => { setEditingProduct(product); setIsModalOpen(true) }} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-xs py-2"><Edit size={14} /> Editar</button>
                                <button onClick={() => handleDelete(product.id)} className="btn-secondary p-2 hover:bg-danger/10 hover:border-danger transition-colors text-danger"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={editingProduct ? handleUpdate : handleCreate} initialData={editingProduct} title={editingProduct ? 'Editar Ítem' : 'Nuevo Ítem de Inventario'} />
        </div>
    )
}

function StatCardSmall({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | number }) {
    return (
        <div className="card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-bg-secondary">{icon}</div>
            <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">{title}</p>
                <p className="text-lg font-bold text-text-primary">{value}</p>
            </div>
        </div>
    )
}
