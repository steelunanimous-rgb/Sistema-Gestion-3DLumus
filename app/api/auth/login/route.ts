import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { login } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        // 1. Find user
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        // 2. Verify password
        const isPasswordValid = await bcrypt.compare(password, (user as any).password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        // 3. Create session
        await login({
            id: user.id,
            email: user.email,
            name: user.name
        })

        return NextResponse.json({ success: true })

    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        )
    }
}
