import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const session = await getSession()
    const { pathname } = request.nextUrl

    // 1. If trying to access auth pages and has session, redirect to dashboard
    if (pathname.startsWith('/login') || pathname === '/') {
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        return NextResponse.next()
    }

    // 2. Protect all other routes
    if (!session) {
        // Check if it's an API route or a page
        if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        // Allow setup for now if needed, but better to protect it too
        if (pathname.startsWith('/api/auth/setup')) {
            return NextResponse.next()
        }

        // Redirect to login pages
        const protectedPages = ['/dashboard', '/pedidos', '/productos', '/clientes', '/inventario', '/finanzas', '/analiticas', '/configuracion']
        if (protectedPages.some(page => pathname.startsWith(page))) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (logo_full.png, etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
    ],
}
