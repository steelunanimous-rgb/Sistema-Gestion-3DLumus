'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Package, TrendingDown, TrendingUp, AlertTriangle, Loader2, Layers, Plus } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import ProductModal from '@/components/products/ProductModal'

export default function InventarioPage() {
    const [data, setData] = useState({ products: [], stats: { totalProducts: 0, totalMaterials: 0, lowStockCount: 0, totalInventoryValue: 0 } })
    const [movements, setMovements] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const [pRes, mRes] = await Promise.all([
                fetch('/api/products').then(r => r.json()),
                fetch('/api/inventory/movements').then(r => r.json())
            ])
            setData(pRes)
            setMovements(mRes)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchData() }, [fetchData])

    const handleCreateMaterial = async (formData: any) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, category: 'MATERIAL' }),
            })
            if (!res.ok) throw new Error('Error al crear material')
            await fetchData()
            setIsModalOpen(false)
        } catch (err: any) {
            alert(err.message)
        }
    }

    if (loading && data.products.length === 0) return (
        <div className="h-[60vh] flex items-center justify-center">
            <Loader2 size={48} className="animate-spin text-accent-primary" />
        </div>
    )

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Inventario</h1>
                    <p className="text-text-muted">Estado de materiales y productos finalizados</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2 w-full lg:w-auto justify-center"
                >
                    <Plus size={20} /> Nuevo Material
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent-primary/10"><Package className="text-accent-primary" /></div>
                    <div><p className="text-xs text-text-muted">Productos</p><p className="text-2xl font-bold">{data.stats.totalProducts}</p></div>
                </div>
                <div className="card flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-warning/10"><Layers className="text-warning" /></div>
                    <div><p className="text-xs text-text-muted">Materiales</p><p className="text-2xl font-bold">{data.stats.totalMaterials}</p></div>
                </div>
                <div className="card flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-danger/10"><AlertTriangle className="text-danger" /></div>
                    <div><p className="text-xs text-text-muted">Stock Bajo</p><p className="text-2xl font-bold text-danger">{data.stats.lowStockCount}</p></div>
                </div>
                <div className="card flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-success/10"><TrendingUp className="text-success" /></div>
                    <div><p className="text-xs text-text-muted">Valor Total</p><p className="text-xl font-bold text-success">{formatCurrency(data.stats.totalInventoryValue)}</p></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-lg font-semibold mb-4 text-text-primary">Stock Actual por Categoría</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Ítem</th>
                                    <th>Categoría</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.products.map((p: any) => (
                                    <tr key={p.id} className="table-row">
                                        <td>
                                            <p className="text-sm font-medium">{p.name}</p>
                                            <p className="text-[10px] text-text-muted">{p.unit}</p>
                                        </td>
                                        <td>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.category === 'MATERIAL' ? 'bg-warning/10 text-warning' : 'bg-accent-primary/10 text-accent-primary'}`}>
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="font-bold">{p.stockCurrent}</td>
                                        <td>
                                            {p.stockCurrent <= p.stockMin
                                                ? <span className="badge-warning text-[10px]">REABASTECER</span>
                                                : <span className="badge-success text-[10px]">OK</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold mb-4 text-text-primary">Últimos Movimientos</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead className="table-header"><tr><th>Fecha</th><th>Ítem</th><th>Tipo</th><th>Cant.</th></tr></thead>
                            <tbody>
                                {movements.map((m: any) => (
                                    <tr key={m.id} className="table-row">
                                        <td className="text-[10px] text-text-muted">{formatDate(m.createdAt)}</td>
                                        <td className="text-sm">
                                            <p className="truncate max-w-[120px] font-medium">{m.product.name}</p>
                                            <p className="text-[10px] text-text-muted">{m.reason}</p>
                                        </td>
                                        <td>
                                            <span className={`text-[10px] font-bold ${m.type === 'in' ? 'text-success' : 'text-danger'}`}>
                                                {m.type === 'in' ? 'ENTRADA' : 'SALIDA'}
                                            </span>
                                        </td>
                                        <td className="font-bold">{m.type === 'in' ? '+' : '-'}{m.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateMaterial}
                initialData={{ category: 'MATERIAL', priceSale: 0 }}
                title="Nuevo Material / Insumo"
            />
        </div>
    )
}
