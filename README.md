# 3D Lumus - Sistema de Gestión

Sistema profesional de gestión administrativa para negocio de lightboxes.

## 🚀 Características

- **Dashboard Profesional**: KPIs, gráficas y métricas en tiempo real
- **Gestión de Pedidos**: Control completo de pedidos desde Facebook, Instagram y TikTok
- **Productos**: Catálogo con control de precios, costos y márgenes
- **Clientes**: Base de datos de clientes con historial
- **Inventario**: Control de stock con alertas automáticas
- **Finanzas**: Ingresos, gastos, balance y ROI
- **Analíticas**: Reportes avanzados y visualización de datos
- **Mobile-First**: Optimizado para uso en móvil y desktop

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS con tema dark personalizado
- **Charts**: Recharts
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Database**: PostgreSQL + Prisma ORM
- **Icons**: Lucide React

## 📦 Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar base de datos**:
Crear archivo `.env` en la raíz del proyecto:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/3dlumus?schema=public"
```

3. **Generar cliente de Prisma**:
```bash
npm run db:generate
```

4. **Sincronizar base de datos**:
```bash
npm run db:push
```

5. **Iniciar servidor de desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📂 Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── dashboard/         # Página principal
│   ├── pedidos/           # Gestión de pedidos
│   ├── productos/         # Catálogo de productos
│   ├── clientes/          # Base de clientes
│   ├── inventario/        # Control de stock
│   ├── finanzas/          # Finanzas y ROI
│   ├── analiticas/        # Reportes y analíticas
│   └── configuracion/     # Configuración del sistema
├── components/            # Componentes reutilizables
│   └── Sidebar.tsx       # Navegación principal
├── lib/                   # Utilidades y configuración
│   ├── prisma.ts         # Cliente de Prisma
│   └── utils.ts          # Funciones auxiliares
├── prisma/               # Configuración de base de datos
│   └── schema.prisma     # Esquema de base de datos
└── styles/               # Estilos globales

```

## 🎨 Diseño

El diseño sigue los principios de:
- **Dark Mode**: Tema oscuro profesional
- **Mobile-First**: Optimizado para dispositivos móviles
- **Tipografía**: Inter de Google Fonts
- **Colores**: Paleta naranja (#F7931A) como acento principal
- **Componentes**: Cards, badges, tablas con diseño consistente

## 💾 Base de Datos

Modelos principales:
- **User**: Usuarios del sistema
- **Product**: Productos (lightboxes)
- **Customer**: Clientes
- **Order**: Pedidos
- **OrderItem**: Items de pedidos
- **InventoryMovement**: Movimientos de inventario
- **Transaction**: Transacciones financieras

## 🔐 Próximos Pasos

1. Implementar autenticación de usuarios
2. Conectar API routes a Prisma
3. Crear formularios para CRUD operations
4. Implementar sistema de notificaciones
5. Agregar exportación de reportes (PDF/Excel)
6. Implementar backup automático de base de datos

## 📝 Licencia

Proyecto privado - 3D Lumus © 2026
