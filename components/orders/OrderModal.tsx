'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Save, Plus, Trash2 } from 'lucide-react'
import { orderSchema, type OrderInput } from '@/lib/validations/order'
import { formatCurrency } from '@/lib/utils'

interface OrderModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: OrderInput) => Promise<void>
    title: string
}

interface Product {
    id: string
    name: string
    priceSale: number
    stockCurrent: number
}

interface Customer {
    id: string
    name: string
}

export default function OrderModal({ isOpen, onClose, onSave, title }: OrderModalProps) {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [products, setProducts] = useState<Product[]>([])

    const { register, control, handleSubmit, watch, reset, setValue, formState: { errors, isSubmitting } } = useForm<OrderInput>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            platform: 'facebook',
            status: 'pendiente',
            items: [{ productId: '', quantity: 1, priceUnit: 0 }]
        }
    })

    const { fields, append, remove } = useFieldArray({ control, name: 'items' })
    const watchItems = watch('items')

    useEffect(() => {
        if (isOpen) {
            Promise.all([
                fetch('/api/customers').then(res => res.json()),
                fetch('/api/products').then(res => res.json())
            ]).then(([cData, pData]) => {
                setCustomers(cData.customers)
                setProducts(pData.products)
            })
            reset()
        }
    }, [isOpen, reset])

    const total = watchItems.reduce((acc, item) => acc + (Number(item.priceUnit) * Number(item.quantity) || 0), 0)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-bg-card border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border-subtle sticky top-0 bg-bg-card z-10">
                    <h2 className="text-xl font-bold text-text-primary">{title}</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Cliente *</label>
                            <select {...register('customerId')} className="input w-full">
                                <option value="" className="bg-bg-card text-text-primary">Seleccionar cliente...</option>
                                {customers.map(c => <option key={c.id} value={c.id} className="bg-bg-card text-text-primary">{c.name}</option>)}
                            </select>
                            {errors.customerId && <p className="text-xs text-danger mt-1">Requerido</p>}
                        </div>
                        <div>
                            <label className="label">Plataforma *</label>
                            <select {...register('platform')} className="input w-full">
                                <option value="facebook" className="bg-bg-card text-text-primary">Facebook</option>
                                <option value="instagram" className="bg-bg-card text-text-primary">Instagram</option>
                                <option value="tiktok" className="bg-bg-card text-text-primary">TikTok</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="label mb-0">Productos en el Pedido</label>
                            <button type="button" onClick={() => append({ productId: '', quantity: 1, priceUnit: 0 })} className="text-sm text-accent-primary hover:underline flex items-center gap-1">
                                <Plus size={16} /> Agregar ítem
                            </button>
                        </div>
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-bg-secondary/30 p-3 rounded-lg border border-border-subtle">
                                <div className="md:col-span-5">
                                    <label className="text-xs text-text-muted mb-1 block">Producto</label>
                                    <select
                                        {...register(`items.${index}.productId` as const, {
                                            onChange: (e) => {
                                                const prod = products.find(p => p.id === e.target.value)
                                                if (prod) {
                                                    setValue(`items.${index}.priceUnit`, Number(prod.priceSale))
                                                }
                                            }
                                        })}
                                        className="input w-full py-1 text-sm"
                                    >
                                        <option value="" className="bg-bg-card text-text-primary">Seleccionar...</option>
                                        {products.map(p => <option key={p.id} value={p.id} className="bg-bg-card text-text-primary">{p.name} (Stock: {p.stockCurrent})</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs text-text-muted mb-1 block">Cant.</label>
                                    <input type="number" {...register(`items.${index}.quantity` as const, { valueAsNumber: true })} className="input w-full py-1 text-sm" />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="text-xs text-text-muted mb-1 block">Precio U.</label>
                                    <input type="number" step="0.01" {...register(`items.${index}.priceUnit` as const, { valueAsNumber: true })} className="input w-full py-1 text-sm" />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <button type="button" onClick={() => remove(index)} className="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                        {errors.items && <p className="text-xs text-danger">{errors.items.message}</p>}
                    </div>

                    <div className="pt-4 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-right w-full md:w-auto">
                            <p className="text-text-muted text-sm">TOTAL DEL PEDIDO</p>
                            <p className="text-3xl font-bold text-accent-primary">{formatCurrency(total)}</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button type="button" onClick={onClose} className="btn-secondary w-full md:w-32">Cancelar</button>
                            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 md:w-48 flex items-center justify-center gap-2">
                                {isSubmitting ? 'Guardando...' : <><Save size={20} /> Crear Pedido</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
