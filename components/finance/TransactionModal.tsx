'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Save, AlertCircle } from 'lucide-react'
import { transactionSchema, type TransactionInput } from '@/lib/validations/transaction'

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: TransactionInput) => Promise<void>
    title: string
}

export default function TransactionModal({
    isOpen,
    onClose,
    onSave,
    title,
}: TransactionModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TransactionInput>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: 'gasto',
            category: 'Materiales',
            description: '',
            amount: 0,
            paymentMethod: 'Efectivo',
            date: new Date().toISOString().split('T')[0],
        },
    })

    if (!isOpen) return null

    const onSubmit = async (data: TransactionInput) => {
        await onSave(data)
        reset()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-bg-card border border-border-subtle rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-in">
                <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-bg-secondary/50">
                    <h2 className="text-xl font-bold text-text-primary">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-bg-secondary rounded-lg transition-colors text-text-muted hover:text-text-primary"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Tipo */}
                        <div>
                            <label className="label">Tipo *</label>
                            <select {...register('type')} className="input w-full">
                                <option value="gasto" className="bg-bg-card text-text-primary">Gasto</option>
                                <option value="ingreso" className="bg-bg-card text-text-primary">Ingreso</option>
                            </select>
                        </div>
                        {/* Fecha */}
                        <div>
                            <label className="label">Fecha *</label>
                            <input
                                type="date"
                                {...register('date')}
                                className="input w-full"
                            />
                        </div>
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="label">Categoría *</label>
                        <select {...register('category')} className="input w-full">
                            <option value="Materiales" className="bg-bg-card text-text-primary">Materiales</option>
                            <option value="Servicios" className="bg-bg-card text-text-primary">Servicios (Luz, Internet)</option>
                            <option value="Publicidad" className="bg-bg-card text-text-primary">Publicidad (Ads)</option>
                            <option value="Herramientas" className="bg-bg-card text-text-primary">Herramientas</option>
                            <option value="Ventas" className="bg-bg-card text-text-primary">Ventas de Productos</option>
                            <option value="Otros" className="bg-bg-card text-text-primary">Otros</option>
                        </select>
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="label">Monto (HNL) *</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('amount', { valueAsNumber: true })}
                            className={`input w-full ${errors.amount ? 'border-danger' : ''}`}
                            placeholder="0.00"
                        />
                        {errors.amount && (
                            <p className="text-xs text-danger mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.amount.message}
                            </p>
                        )}
                    </div>

                    {/* Método de Pago */}
                    <div>
                        <label className="label">Método de Pago *</label>
                        <select {...register('paymentMethod')} className="input w-full">
                            <option value="Efectivo" className="bg-bg-card text-text-primary">Efectivo</option>
                            <option value="Transferencia" className="bg-bg-card text-text-primary">Transferencia</option>
                            <option value="Tarjeta" className="bg-bg-card text-text-primary">Tarjeta</option>
                        </select>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="label">Descripción</label>
                        <textarea
                            {...register('description')}
                            className="input w-full min-h-[80px] py-3"
                            placeholder="Detalles de la transacción..."
                        />
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-border-subtle">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={20} />
                                    Guardar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
