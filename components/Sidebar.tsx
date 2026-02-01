'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Boxes,
    DollarSign,
    BarChart3,
    Settings,
    Menu,
    X,
} from 'lucide-react'

interface NavItem {
    name: string
    href: string
    icon: React.ElementType
}

const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Pedidos', href: '/pedidos', icon: ShoppingCart },
    { name: 'Productos', href: '/productos', icon: Package },
    { name: 'Clientes', href: '/clientes', icon: Users },
    { name: 'Inventario', href: '/inventario', icon: Boxes },
    { name: 'Finanzas', href: '/finanzas', icon: DollarSign },
    { name: 'Analíticas', href: '/analiticas', icon: BarChart3 },
    { name: 'Configuración', href: '/configuracion', icon: Settings },
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-bg-card border border-border-subtle text-text-primary hover:bg-bg-secondary transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-bg-secondary border-r border-border-subtle
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-border-subtle">
                        <Image
                            src="/logo_full.png"
                            alt="3DBOX Logo"
                            width={160}
                            height={40}
                            className="h-10 w-auto"
                        />
                        <p className="text-[10px] text-text-muted mt-2 uppercase tracking-widest font-bold">Sistema de Gestión</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                const Icon = item.icon

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-200
                        ${isActive
                                                    ? 'bg-accent-primary text-white font-semibold'
                                                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                                                }
                      `}
                                        >
                                            <Icon size={20} />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-border-subtle">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center text-white font-bold">
                                A
                            </div>
                            <div>
                                <p className="text-sm font-medium text-text-primary">Admin</p>
                                <p className="text-xs text-text-muted">admin@3dbox.hn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
