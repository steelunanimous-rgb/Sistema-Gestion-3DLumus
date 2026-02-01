import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // Check if any user exists
        const userCount = await prisma.user.count()

        if (userCount > 0) {
            return NextResponse.json({ message: 'El sistema ya ha sido inicializado' }, { status: 400 })
        }

        // Create initial admin
        const hashedPassword = await bcrypt.hash('admin123', 10)

        const admin = await (prisma.user as any).create({
            data: {
                name: 'Admin 3DBOX',
                email: 'admin@3dbox.hn',
                password: hashedPassword,
                role: 'admin'
            }
        })

        return NextResponse.json({
            message: 'Admin creado exitosamente',
            user: {
                email: admin.email,
                name: admin.name
            }
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
