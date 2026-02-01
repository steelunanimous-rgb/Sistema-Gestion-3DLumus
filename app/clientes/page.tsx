'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Plus, Search, User, ShoppingBag, DollarSign, Edit, Trash2, Loader2 } from 'lucide-react'
import CustomerModal from '@/components/customers/CustomerModal'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function ClientesPage() {
    const [customers, setCustomers] = useState([])
    const [stats, setStats] = useState({ totalCustomers: 0, activeCustomers: 0, averageValue: 0 })
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/customers')
            const data = await res.json()
            setCustomers(data.customers)
            setStats(data.stats)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchData() }, [fetchData])

    const handleSave = async (data: any) => {
        const url = editingCustomer ? `/api/customers/${editingCustomer.id}` : '/api/customers'
        const method = editingCustomer ? 'PUT' : 'POST'
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        setIsModalOpen(false)
        fetchData()
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Eliminar este cliente?')) return
        await fetch(`/api/customers/${id}`, { method: 'DELETE' })
        fetchData()
    }

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.socialMedia.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading && customers.length === 0) return <div className="h-[60vh] flex items-center justify-center"><Loader2 size={48} className="animate-spin text-accent-primary" /></div>

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Clientes</h1>
                    <p className="text-text-muted">Base de datos de clientes del negocio</p>
                </div>
                <button onClick={() => { setEditingCustomer(null); setIsModalOpen(true) }} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Nuevo Cliente
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent-primary/10"><User className="text-accent-primary" /></div>
                    <div><p className="text-xs text-text-muted">Total</p><p className="text-2xl font-bold">{stats.totalCustomers}</p></div>
                </div>
                <div className="card flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-success/10"><ShoppingBag className="text-success" /></div>
                    <div><p className="text-xs text-text-muted">Activos</p><p className="text-2xl font-bold">{stats.activeCustomers}</p></div>
                </div>
                <div className="card flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent-primary/10"><DollarSign className="text-accent-primary" /></div>
                    <div><p className="text-xs text-text-muted">Promedio</p><p className="text-2xl font-bold">{formatCurrency(stats.averageValue)}</p></div>
                </div>
            </div>

            <div className="card mb-6">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input w-full pl-10" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((customer) => (
                    <div key={customer.id} className="card-hover">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold text-xl uppercase">
                                {customer.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-text-primary mb-1 truncate">{customer.name}</h3>
                                <p className="text-sm text-text-muted">{customer.phone}</p>
                                <p className="text-sm text-accent-primary truncate">{customer.socialMedia}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border-subtle">
                            <div><p className="text-xs text-text-muted mb-1">Pedidos</p><p className="text-xl font-bold">{customer.orderCount}</p></div>
                            <div><p className="text-xs text-text-muted mb-1">Total</p><p className="text-xl font-bold text-success">{formatCurrency(customer.totalSpent)}</p></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-text-muted">Último: {customer.lastOrder ? formatDate(customer.lastOrder) : 'Nunca'}</div>
                            <div className="flex gap-1">
                                <button onClick={() => { setEditingCustomer(customer); setIsModalOpen(true) }} className="p-2 hover:bg-bg-secondary rounded-lg"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(customer.id)} className="p-2 hover:bg-danger/10 rounded-lg text-danger"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <CustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} initialData={editingCustomer} title={editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'} />
        </div>
    )
}
