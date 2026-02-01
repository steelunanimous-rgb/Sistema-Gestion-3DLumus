'use client'

import React, { useState, useEffect } from 'react'
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, Package, DollarSign, ShoppingCart, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const COLORS = ['#F7931A', '#FBB040', '#3DD598', '#FF6B6B', '#FFC542']

export default function AnaliticasPage() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/analytics')
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    console.error('Analytics error:', json.error)
                    return
                }
                setData(json)
                setLoading(false)
            })
            .catch(err => {
                console.error('Fetch error:', err)
                setLoading(false)
            })
    }, [])

    if (loading || !data || data.error) return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-text-muted">
            <Loader2 size={48} className="animate-spin mb-4 text-accent-primary" />
            <p>{data?.error ? `Error: ${data.error}` : 'Calculando analíticas en tiempo real...'}</p>
        </div>
    )

    const { metrics, monthlyPerformance, platformDistribution, productPerformance } = data as any

    return (
        <div className="animate-fade-in pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">Analíticas</h1>
                <p className="text-text-muted">Desempeño real basado en tus ventas y gastos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={<DollarSign className="text-accent-primary" />} title="Ingresos" value={formatCurrency(metrics.totalIncome)} />
                <StatCard icon={<Package className="text-danger" />} title="Gastos" value={formatCurrency(metrics.totalExpenses)} />
                <StatCard icon={<TrendingUp className="text-success" />} title="Utilidad" value={formatCurrency(metrics.netProfit)} />
                <StatCard icon={<ShoppingCart className="text-accent-primary" />} title="ROI" value={`${metrics.roi}%`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Rendimiento Mensual (HNL)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyPerformance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                            <XAxis dataKey="month" stroke="#8A8A8A" />
                            <YAxis stroke="#8A8A8A" />
                            <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="ventas" fill="#F7931A" name="Ventas" />
                            <Bar dataKey="gastos" fill="#FF6B6B" name="Gastos" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Margen por Producto (Top 5)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={productPerformance}
                                cx="50%" cy="50%" labelLine={false}
                                label={({ name, margin }) => `${name}: ${margin}%`}
                                outerRadius={80} dataKey="margin"
                            >
                                {productPerformance.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Ventas por Plataforma</h2>
                    <div className="space-y-6">
                        {platformDistribution.map((p, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium capitalize">{p.platform}</span>
                                    <span className="text-sm font-bold">{p.percentage}%</span>
                                </div>
                                <div className="w-full bg-bg-secondary h-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent-primary" style={{ width: `${p.percentage}%` }} />
                                </div>
                                <p className="text-[10px] text-text-muted mt-1">{p.count} pedidos realizados</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Tendencia de Utilidad</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={monthlyPerformance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                            <XAxis dataKey="month" stroke="#8A8A8A" />
                            <YAxis stroke="#8A8A8A" />
                            <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="utilidad" stroke="#3DD598" strokeWidth={4} dot={{ fill: '#3DD598', r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon, title, value }) {
    return (
        <div className="card flex items-center gap-4">
            <div className="p-4 rounded-xl bg-bg-secondary">{icon}</div>
            <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-black text-text-primary">{value}</p>
            </div>
        </div>
    )
}
