'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Plus, Search, Filter, Eye, Edit, Trash2, Loader2 } from 'lucide-react'
import OrderModal from '@/components/orders/OrderModal'
import { formatCurrency, formatDate, getStatusBadgeClass } from '@/lib/utils'

const platformConfig = {
    facebook: { label: 'Facebook', className: 'bg-blue-500/20 text-blue-400' },
    instagram: { label: 'Instagram', className: 'bg-pink-500/20 text-pink-400' },
    tiktok: { label: 'TikTok', className: 'bg-purple-500/20 text-purple-400' },
}

const statusLabels = {
    pendiente: 'Pendiente',
    en_produccion: 'En Producción',
    entregado: 'Entregado',
    cancelado: 'Cancelado'
}

export default function PedidosPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [stats, setStats] = useState({ total: 0, pendientes: 0, enProduccion: 0, entregados: 0 })
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/orders')
            const data = await res.json()
            setOrders(data.orders)
            setStats(data.stats)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchData() }, [fetchData])

    const handleSave = async (data: any) => {
        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        setIsModalOpen(false)
        fetchData()
    }

    const updateStatus = async (id: string, status: string) => {
        await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        fetchData()
    }

    const filtered = orders.filter(o =>
        o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.includes(searchTerm)
    )

    if (loading && orders.length === 0) return <div className="h-[60vh] flex items-center justify-center"><Loader2 size={48} className="animate-spin text-accent-primary" /></div>

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Pedidos</h1>
                    <p className="text-text-muted">Gestiona todos los pedidos de tu negocio</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Nuevo Pedido
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="card"><p className="text-xs text-text-muted mb-1">Total</p><p className="text-2xl font-bold">{stats.total}</p></div>
                <div className="card"><p className="text-xs text-text-muted mb-1">Pendientes</p><p className="text-2xl font-bold text-accent-primary">{stats.pendientes}</p></div>
                <div className="card"><p className="text-xs text-text-muted mb-1">Producción</p><p className="text-2xl font-bold text-warning">{stats.enProduccion}</p></div>
                <div className="card"><p className="text-xs text-text-muted mb-1">Entregados</p><p className="text-2xl font-bold text-success">{stats.entregados}</p></div>
            </div>

            <div className="card mb-6">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" placeholder="Buscar pedidos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input w-full pl-10" />
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Plataforma</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th className="text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((order) => (
                                <tr key={order.id} className="table-row">
                                    <td className="font-mono text-xs">{order.id.slice(0, 8)}</td>
                                    <td>
                                        <p className="font-medium">{order.customer.name}</p>
                                        <p className="text-xs text-text-muted">{order.customer.phone}</p>
                                    </td>
                                    <td><span className={`badge ${(platformConfig as any)[order.platform].className}`}>{(platformConfig as any)[order.platform].label}</span></td>
                                    <td>{order.items.length}</td>
                                    <td className="font-bold text-accent-primary">{formatCurrency(order.total)}</td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className={`text-[10px] px-2 py-1 rounded-full border-0 font-bold cursor-pointer outline-none shadow-sm transition-all ${getStatusBadgeClass(order.status)}`}
                                        >
                                            {Object.entries(statusLabels).map(([val, label]) => (
                                                <option key={val} value={val} className="bg-bg-card text-text-primary">
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="text-xs text-text-muted">{formatDate(order.createdAt)}</td>
                                    <td className="text-right">
                                        <button className="p-2 hover:bg-bg-secondary rounded-lg"><Eye size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} title="Nuevo Pedido" />
        </div>
    )
}
