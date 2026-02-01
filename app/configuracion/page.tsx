'use client'

import React from 'react'
import { User, Bell, Shield, Database, Palette, Globe } from 'lucide-react'

export default function ConfiguracionPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">Configuración</h1>
                <p className="text-text-muted">Ajustes del sistema y preferencias</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* Profile Settings */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-lg bg-accent-primary/10">
                            <User size={24} className="text-accent-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-text-primary">Perfil</h2>
                            <p className="text-sm text-text-muted">
                                Información personal y credenciales
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Nombre</label>
                            <input type="text" className="input w-full" defaultValue="Admin" />
                        </div>
                        <div>
                            <label className="label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="input w-full"
                                defaultValue="admin@3dbox.hn"
                            />
                        </div>
                        <div>
                            <label className="label">Teléfono</label>
                            <input
                                type="tel"
                                className="input w-full"
                                defaultValue="+504 9999-9999"
                            />
                        </div>
                        <div>
                            <label className="label">Rol</label>
                            <select className="input w-full">
                                <option>Administrador</option>
                                <option>Editor</option>
                                <option>Vendedor</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className="btn-primary">Guardar Cambios</button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-lg bg-success/10">
                            <Bell size={24} className="text-success" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-text-primary">
                                Notificaciones
                            </h2>
                            <p className="text-sm text-text-muted">
                                Configura alertas y recordatorios
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    Alertas de Stock Bajo
                                </p>
                                <p className="text-xs text-text-muted">
                                    Recibir notificaciones cuando el stock esté bajo
                                </p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    Nuevos Pedidos
                                </p>
                                <p className="text-xs text-text-muted">
                                    Notificar sobre pedidos nuevos
                                </p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    Resumen Diario
                                </p>
                                <p className="text-xs text-text-muted">
                                    Recibir resumen de ventas diarias
                                </p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Business Settings */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-lg bg-accent-primary/10">
                            <Globe size={24} className="text-accent-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-text-primary">Negocio</h2>
                            <p className="text-sm text-text-muted">
                                Información del negocio y preferencias
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Nombre del Negocio</label>
                            <input
                                type="text"
                                className="input w-full"
                                defaultValue="3DBOX"
                            />
                        </div>
                        <div>
                            <label className="label">Moneda</label>
                            <select className="input w-full">
                                <option>HNL (Lempiras)</option>
                                <option>USD (Dólares)</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Timezone</label>
                            <select className="input w-full">
                                <option>América/Tegucigalpa (GMT-6)</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Impuesto de Venta (%)</label>
                            <input type="number" className="input w-full" defaultValue="15" />
                        </div>
                    </div>
                </div>

                {/* Database */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-lg bg-warning/10">
                            <Database size={24} className="text-warning" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-text-primary">
                                Base de Datos
                            </h2>
                            <p className="text-sm text-text-muted">
                                Respaldo y mantenimiento de datos
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    Último Respaldo
                                </p>
                                <p className="text-xs text-text-muted">2026-02-01 08:00 AM</p>
                            </div>
                            <button className="btn-secondary text-sm">Crear Respaldo</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    Respaldo Automático
                                </p>
                                <p className="text-xs text-text-muted">Diario a las 2:00 AM</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
