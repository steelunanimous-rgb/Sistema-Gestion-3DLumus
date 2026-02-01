'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (res.ok) {
                router.push('/dashboard')
            } else {
                alert(data.error || 'Credenciales incorrectas')
            }
        } catch (err) {
            alert('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background geometric shapes for depth */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-secondary/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-md z-10 animate-fade-in">
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
                        <Image 
                            src="/logo_full.png" 
                            alt="3DBOX Logo" 
                            width={320} 
                            height={80} 
                            className="h-20 w-auto drop-shadow-[0_0_15px_rgba(247,147,26,0.3)]" 
                            priority 
                        />
                    </div>
                </div>

                {/* Login Card */}
                <div className="card backdrop-blur-md bg-bg-card/80 border-border-subtle/50 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-text-primary flex items-center gap-2">
                            Bienvenido <Sparkles size={24} className="text-accent-primary" />
                        </h2>
                        <p className="text-text-muted mt-2">Ingresa tus credenciales para administrar tu negocio.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="label">Correo Electrónico</label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@3dbox.hn"
                                    className="input w-full pl-12 h-12 bg-bg-secondary/50 focus:bg-bg-secondary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="label">Contraseña</label>
                                <a href="#" className="text-xs text-accent-primary hover:underline">¿Olvidaste tu contraseña?</a>
                            </div>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-secondary transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input w-full pl-12 h-12 bg-bg-secondary/50 focus:bg-bg-secondary transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full h-12 flex items-center justify-center gap-3 text-lg font-bold relative overflow-hidden group shadow-lg shadow-accent-primary/20"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <span>Iniciar Sesión</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Quick Access Note (only for dev/demonstration) */}
                    <div className="mt-8 pt-6 border-t border-border-subtle/30 text-center">
                        <p className="text-xs text-text-muted italic">
                            Acceso seguro con encriptación de grado empresarial.
                        </p>
                    </div>
                </div>

                {/* Footer labels */}
                <div className="mt-12 text-center text-[10px] text-text-muted uppercase tracking-[0.2em] opacity-40">
                    &copy; 2026 3DBOX Labs • All rights reserved
                </div>
            </div>
        </div>
    )
}
