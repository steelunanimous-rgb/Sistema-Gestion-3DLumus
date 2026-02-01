'use client'

import React, { useState, useEffect } from 'react'
import { DollarSign, ShoppingCart, Package, TrendingUp, Loader2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCurrency } from '@/lib/utils'

export default function DashboardPage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            fetch('/api/orders').then(r => r.json()),
            fetch('/api/finance').then(r => r.json())
        ]).then(([orders, finance]) => {
            setData({ orders, finance })
            setLoading(false)
        })
    }, [])

    if (loading) return <div className="h-screen flex items-center justify-center bg-bg-primary"><Loader2 size={64} className="animate-spin text-accent-primary" /></div>

    const recentOrders = data.orders.orders.slice(0, 5)

    return (
        <div className="animate-fade-in p-2 md:p-6 lg:p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-extrabold text-text-primary">Global Overview</h1>
                <p className="text-text-muted mt-1">Status real de 3DBOX Lightboxes</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<DollarSign className="text-success" />} title="Ingresos Totales" value={formatCurrency(data.finance.stats.ingresos)} trend="+12%" />
                <StatCard icon={<ShoppingCart className="text-accent-primary" />} title="Pedidos Totales" value={data.orders.stats.total} trend={`${Math.round((data.orders.stats.pendientes / data.orders.stats.total) * 100)}% pendientes`} />
                <StatCard icon={<TrendingUp className="text-success" />} title="ROI Promedio" value={`${data.finance.stats.roi.toFixed(1)}%`} trend="Saludable" />
                <StatCard icon={<Package className="text-warning" />} title="En Producción" value={data.orders.stats.enProduccion} trend="En taller" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card p-8 h-[400px]">
                    <h3 className="text-xl font-bold mb-6">Desempeño Financiero</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={data.finance.transactions.slice(-10).reverse()}>
                            <XAxis dataKey="date" hide />
                            <YAxis hide />
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                            <Tooltip contentStyle={{ backgroundColor: '#181818', border: '1px solid #333' }} />
                            <Line type="monotone" dataKey="amount" stroke="#F7931A" strokeWidth={4} dot={{ fill: '#F7931A', r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="card p-8">
                    <h3 className="text-xl font-bold mb-6">Plataformas</h3>
                    <ul className="space-y-6">
                        <PlatformRow name="Facebook" percent={45} color="bg-blue-600" />
                        <PlatformRow name="Instagram" percent={35} color="bg-pink-600" />
                        <PlatformRow name="TikTok" percent={20} color="bg-purple-600" />
                    </ul>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="p-8 border-b border-border-subtle flex justify-between items-center">
                    <h3 className="text-xl font-bold">Últimos pedidos realizados</h3>
                    <a href="/pedidos" className="text-sm text-accent-primary hover:underline">Ver todo</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-bg-secondary/30 text-xs uppercase text-text-muted">
                            <tr>
                                <th className="px-8 py-4">ID</th>
                                <th className="px-8 py-4">Cliente</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {recentOrders.map((o: any) => (
                                <tr key={o.id} className="hover:bg-bg-secondary/20 transition-colors">
                                    <td className="px-8 py-5 font-mono text-xs text-text-muted">{o.id.slice(0, 8)}</td>
                                    <td className="px-8 py-5 font-semibold">{o.customer.name}</td>
                                    <td className="px-8 py-5"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ring-1 ring-inset ${o.status === 'entregado' ? 'bg-success/10 text-success ring-success/20' : 'bg-warning/10 text-warning ring-warning/20'}`}>{o.status}</span></td>
                                    <td className="px-8 py-5 text-right font-black text-text-primary">{formatCurrency(o.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string | number, trend: string }) {
    return (
        <div className="card p-6 flex items-start gap-4 transform hover:scale-[1.02] transition-all duration-300">
            <div className="p-4 rounded-2xl bg-bg-secondary shadow-inner">{icon}</div>
            <div>
                <p className="text-xs text-text-muted font-bold tracking-widest uppercase">{title}</p>
                <p className="text-2xl font-black text-text-primary my-1">{value}</p>
                <p className="text-[10px] font-medium opacity-60">{trend}</p>
            </div>
        </div>
    )
}

function PlatformRow({ name, percent, color }: { name: string, percent: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                <span>{name}</span>
                <span>{percent}%</span>
            </div>
            <div className="w-full bg-bg-secondary h-2.5 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    )
}
