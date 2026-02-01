'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Save } from 'lucide-react'
import { customerSchema, type CustomerInput } from '@/lib/validations/customer'

interface CustomerModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: CustomerInput) => Promise<void>
    initialData?: any
    title: string
}

export default function CustomerModal({ isOpen, onClose, onSave, initialData, title }: CustomerModalProps) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CustomerInput>({
        resolver: zodResolver(customerSchema)
    })

    useEffect(() => {
        if (initialData) reset(initialData)
        else reset({ name: '', phone: '', socialMedia: '' })
    }, [initialData, reset, isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-bg-card border border-border-subtle rounded-xl w-full max-w-md shadow-2xl animate-slide-in">
                <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                    <h2 className="text-xl font-bold text-text-primary">{title}</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-4">
                    <div>
                        <label className="label">Nombre Completo *</label>
                        <input {...register('name')} className="input w-full" placeholder="Ej: Juan Pérez" />
                        {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="label">Teléfono *</label>
                        <input {...register('phone')} className="input w-full" placeholder="+504 9999-9999" />
                        {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="label">Red Social (Usuario/Link) *</label>
                        <input {...register('socialMedia')} className="input w-full" placeholder="@usuario o link al perfil" />
                        {errors.socialMedia && <p className="text-xs text-danger mt-1">{errors.socialMedia.message}</p>}
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
                        <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 flex items-center justify-center gap-2">
                            {isSubmitting ? 'Guardando...' : <><Save size={20} /> Guardar</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
