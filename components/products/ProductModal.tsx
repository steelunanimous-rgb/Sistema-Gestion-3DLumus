'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Save, AlertCircle } from 'lucide-react'
import { createProductSchema, type CreateProductInput } from '@/lib/validations/product'

interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: CreateProductInput) => Promise<void>
    initialData?: any
    title: string
}

export default function ProductModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    title,
}: ProductModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateProductInput>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: '',
            description: '',
            priceSale: 0,
            costProduction: 0,
            stockCurrent: 0,
            stockMin: 0,
            category: 'PRODUCTO',
            unit: 'unidades',
            active: true,
        },
    })

    // Reset form when initialData changes or modal opens
    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                category: initialData.category || 'PRODUCTO',
                unit: initialData.unit || 'unidades',
                // Convert entries to numbers in case they come as strings from API/Form
                priceSale: Number(initialData.priceSale),
                costProduction: Number(initialData.costProduction),
                stockCurrent: Number(initialData.stockCurrent),
                stockMin: Number(initialData.stockMin),
            })
        } else {
            reset({
                name: '',
                description: '',
                priceSale: 0,
                costProduction: 0,
                category: 'PRODUCTO',
                unit: 'unidades',
                stockCurrent: 0,
                stockMin: 0,
                active: true,
            })
        }
    }, [initialData, reset, isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-bg-card border border-border-subtle rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-in">
                <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-bg-secondary/50">
                    <h2 className="text-xl font-bold text-text-primary">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-bg-secondary rounded-lg transition-colors text-text-muted hover:text-text-primary"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-4">
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {/* Nombre */}
                        <div>
                            <label className="label">Nombre del Producto *</label>
                            <input
                                {...register('name')}
                                className={`input w-full ${errors.name ? 'border-danger' : ''}`}
                                placeholder="Ej: Lightbox Premium 30x40"
                            />
                            {errors.name && (
                                <p className="text-xs text-danger mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Categoría y Unidad */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Categoría *</label>
                                <select
                                    {...register('category')}
                                    className="input w-full"
                                >
                                    <option value="PRODUCTO">Producto Finalizado</option>
                                    <option value="MATERIAL">Material / Insumo</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">Unidad de Medida *</label>
                                <select
                                    {...register('unit')}
                                    className="input w-full"
                                >
                                    <option value="unidades">Unidades</option>
                                    <option value="metros">Metros</option>
                                    <option value="kg">Kilogramos</option>
                                    <option value="litros">Litros</option>
                                    <option value="rollos">Rollos</option>
                                </select>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="label">Descripción</label>
                            <textarea
                                {...register('description')}
                                className="input w-full min-h-[80px] py-3"
                                placeholder="Describe las características..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Precio Venta */}
                            <div>
                                <label className="label">Precio Venta (HNL) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('priceSale', { valueAsNumber: true })}
                                    className={`input w-full ${errors.priceSale ? 'border-danger' : ''}`}
                                />
                                {errors.priceSale && (
                                    <p className="text-xs text-danger mt-1">{errors.priceSale.message}</p>
                                )}
                            </div>

                            {/* Costo Producción */}
                            <div>
                                <label className="label">Costo Producción (HNL) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('costProduction', { valueAsNumber: true })}
                                    className={`input w-full ${errors.costProduction ? 'border-danger' : ''}`}
                                />
                                {errors.costProduction && (
                                    <p className="text-xs text-danger mt-1">{errors.costProduction.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Stock Actual */}
                            <div>
                                <label className="label">Stock Actual *</label>
                                <input
                                    type="number"
                                    {...register('stockCurrent', { valueAsNumber: true })}
                                    className={`input w-full ${errors.stockCurrent ? 'border-danger' : ''}`}
                                />
                                {errors.stockCurrent && (
                                    <p className="text-xs text-danger mt-1">{errors.stockCurrent.message}</p>
                                )}
                            </div>

                            {/* Stock Mínimo */}
                            <div>
                                <label className="label">Stock Mínimo *</label>
                                <input
                                    type="number"
                                    {...register('stockMin', { valueAsNumber: true })}
                                    className={`input w-full ${errors.stockMin ? 'border-danger' : ''}`}
                                />
                                {errors.stockMin && (
                                    <p className="text-xs text-danger mt-1">{errors.stockMin.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 py-2">
                            <input
                                type="checkbox"
                                id="active"
                                {...register('active')}
                                className="w-5 h-5 rounded border-border-subtle bg-bg-secondary text-accent-primary focus:ring-accent-primary"
                            />
                            <label htmlFor="active" className="text-sm font-medium text-text-primary cursor-pointer">
                                Producto Activo
                            </label>
                        </div>
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
                                    Guardar Producto
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
