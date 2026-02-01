'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Plus, TrendingUp, TrendingDown, DollarSign, Loader2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import TransactionModal from '@/components/finance/TransactionModal'

export default function FinanzasPage() {
    const [data, setData] = useState({ transactions: [], stats: { ingresos: 0, gastos: 0, balance: 0, roi: 0 } })
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/finance')
            const json = await res.json()
            setData(json)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchData() }, [fetchData])

    const handleSaveTransaction = async (formData: any) => {
        try {
            const res = await fetch('/api/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Error al registrar transacción')
            }
            await fetchData()
            setIsModalOpen(false)
        } catch (err: any) {
            alert(err.message)
        }
    }

    if (loading && data.transactions.length === 0) return (
        <div className="h-[60vh] flex items-center justify-center">
            <Loader2 size={48} className="animate-spin text-accent-primary" />
        </div>
    )

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Finanzas</h1>
                    <p className="text-text-muted">Balance económico del negocio</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Nueva Transacción
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="card shadow-soft font-semibold border-success/30">
                    <p className="text-xs text-text-muted opacity-70">Ingresos Totales</p>
                    <p className="text-2xl text-success">{formatCurrency(data.stats.ingresos)}</p>
                </div>
                <div className="card shadow-soft font-semibold border-danger/30">
                    <p className="text-xs text-text-muted opacity-70">Gastos Totales</p>
                    <p className="text-2xl text-danger">{formatCurrency(data.stats.gastos)}</p>
                </div>
                <div className="card shadow-soft font-semibold border-accent-primary/30">
                    <p className="text-xs text-text-muted opacity-70">Balance Neto</p>
                    <p className="text-2xl text-accent-primary">{formatCurrency(data.stats.balance)}</p>
                </div>
                <div className="card shadow-soft font-semibold border-success/30">
                    <p className="text-xs text-text-muted opacity-70">ROI Acumulado</p>
                    <p className="text-2xl text-success">{data.stats.roi.toFixed(1)}%</p>
                </div>
            </div>

            <div className="card">
                <h3 className="text-lg font-bold mb-4">Registro de movimientos</h3>
                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Método</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-text-muted">
                                        No hay transacciones registradas
                                    </td>
                                </tr>
                            ) : (
                                data.transactions.map((t: any) => (
                                    <tr key={t.id} className="table-row">
                                        <td className="text-xs">{formatDate(t.date)}</td>
                                        <td>{t.type === 'ingreso' ? <span className="badge-success">Ingreso</span> : <span className="badge-danger">Gasto</span>}</td>
                                        <td>{t.category}</td>
                                        <td className="text-text-muted italic text-sm">{t.description}</td>
                                        <td className={`font-bold ${t.type === 'ingreso' ? 'text-success' : 'text-danger'}`}>
                                            {t.type === 'ingreso' ? '+' : '-'}{formatCurrency(Number(t.amount))}
                                        </td>
                                        <td className="text-xs uppercase font-medium">{t.paymentMethod}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTransaction}
                title="Registrar Movimiento"
            />
        </div>
    )
}
