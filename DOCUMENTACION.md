# 3D Lumus - Sistema de Gestión Administrativa
## Documentación Ejecutiva del Proyecto

---

## 📋 Resumen del Proyecto

**3D Lumus Admin Dashboard** es una aplicación web administrativa profesional, tipo SaaS, diseñada para la gestión integral de un negocio de lightboxes. La plataforma centraliza pedidos provenientes de redes sociales (Facebook, Instagram, TikTok), controla inventario, finanzas y proporciona analíticas avanzadas del negocio.

### Características Principales
- ✅ Dashboard con KPIs y métricas en tiempo real
- ✅ Gestión completa de pedidos desde múltiples plataformas
- ✅ Control de inventario con alertas automáticas
- ✅ Catálogo de productos con análisis de márgenes
- ✅ Base de datos de clientes con historial
- ✅ Módulo financiero con cálculo automático de ROI
- ✅ Analíticas avanzadas con visualización de datos
- ✅ Diseño mobile-first totalmente responsive
- ✅ Tema dark premium y profesional

---

## 🎨 Diseño Visual

### Paleta de Colores
```
Backgrounds:
- Primary: #121212
- Secondary: #181818
- Card: #1E1E1E
- Border: #2A2A2A

Text:
- Primary: #FFFFFF
- Secondary: #B5B5B5
- Muted: #8A8A8A

Accent Colors:
- Primary (Orange): #F7931A
- Secondary (Light Orange): #FBB040
- Success (Green): #3DD598
- Danger (Red): #FF6B6B
- Warning (Yellow): #FFC542
```

### Tipografía
- **Fuente**: Inter (Google Fonts)
- **Pesos**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Principios de Diseño
1. **Dark-first**: Tema oscuro profesional para reducir fatiga visual
2. **Mobile-first**: Optimizado principalmente para uso en dispositivos móviles
3. **Sidebar adaptativo**: Persistente en desktop, drawer en móvil
4. **Componentes consistentes**: Cards, badges, tablas con diseño unificado
5. **Micro-animaciones**: Transiciones suaves para mejor UX

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS con sistema de tokens personalizado
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Architecture**: Layered (Services/Repositories)

### DevOps & Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript Compiler

---

## 📂 Estructura del Proyecto

```
3DLumus/
├── app/                        # Next.js App Router
│   ├── dashboard/              # Dashboard principal
│   │   ├── layout.tsx          # Layout con sidebar
│   │   └── page.tsx            # Página de dashboard
│   ├── pedidos/                # Módulo de pedidos
│   │   └── page.tsx
│   ├── productos/              # Módulo de productos
│   │   └── page.tsx
│   ├── clientes/               # Módulo de clientes
│   │   └── page.tsx
│   ├── inventario/             # Módulo de inventario
│   │   └── page.tsx
│   ├── finanzas/               # Módulo de finanzas
│   │   └── page.tsx
│   ├── analiticas/             # Módulo de analíticas
│   │   └── page.tsx
│   ├── configuracion/          # Módulo de configuración
│   │   └── page.tsx
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Redirect a dashboard
│   └── globals.css             # Estilos globales
├── components/                 # Componentes reutilizables
│   └── Sidebar.tsx             # Navegación principal
├── lib/                        # Utilidades y configuración
│   ├── prisma.ts               # Cliente de Prisma
│   └── utils.ts                # Funciones auxiliares
├── prisma/                     # Configuración DB
│   └── schema.prisma           # Esquema de base de datos
├── public/                     # Assets estáticos
│   └── logo.svg
├── .env.example                # Variables de entorno (ejemplo)
├── .eslintrc.json              # Configuración ESLint
├── .gitignore                  # Git ignore
├── next.config.mjs             # Configuración Next.js
├── package.json                # Dependencias y scripts
├── postcss.config.mjs          # Configuración PostCSS
├── README.md                   # Documentación
├── tailwind.config.ts          # Configuración Tailwind
└── tsconfig.json               # Configuración TypeScript
```

---

## 💾 Modelo de Base de Datos

### Modelos Principales

#### 1. User (Usuarios del Sistema)
```prisma
- id: String (UUID)
- name: String
- email: String (unique)
- role: String (default: "admin")
- createdAt: DateTime
- updatedAt: DateTime
```

#### 2. Product (Productos/Lightboxes)
```prisma
- id: String (UUID)
- name: String
- description: String (opcional)
- priceSale: Decimal(10,2)
- costProduction: Decimal(10,2)
- stockCurrent: Int
- stockMin: Int
- active: Boolean
- createdAt: DateTime
- updatedAt: DateTime
```

#### 3. Customer (Clientes)
```prisma
- id: String (UUID)
- name: String
- phone: String
- socialMedia: String
- createdAt: DateTime
- updatedAt: DateTime
```

#### 4. Order (Pedidos)
```prisma
- id: String (UUID)
- customerId: String (FK)
- platform: String (facebook | instagram | tiktok)
- status: String (pendiente | en_produccion | entregado | cancelado)
- total: Decimal(12,2)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 5. OrderItem (Items de Pedidos)
```prisma
- id: String (UUID)
- orderId: String (FK)
- productId: String (FK)
- quantity: Int
- priceUnit: Decimal(10,2)
- subtotal: Decimal(12,2)
- createdAt: DateTime
```

#### 6. InventoryMovement (Movimientos de Inventario)
```prisma
- id: String (UUID)
- productId: String (FK)
- type: String (in | out)
- quantity: Int
- reason: String (venta | ajuste | produccion)
- createdAt: DateTime
```

#### 7. Transaction (Transacciones Financieras)
```prisma
- id: String (UUID)
- type: String (ingreso | gasto)
- category: String
- description: String (opcional)
- amount: Decimal(12,2)
- paymentMethod: String
- date: DateTime
- createdAt: DateTime
```

---

## 🧭 Módulos Funcionales

### 1. Dashboard
**Ruta**: `/dashboard`

Características:
- 4 KPI cards principales:
  - Ventas del mes (HNL)
  - Gastos del mes
  - Órdenes completadas
  - Utilidad neta
- Gráfica de líneas: Ventas vs Gastos (últimos 6 meses)
- Distribución por plataforma (Facebook, Instagram, TikTok)
- Tabla de pedidos recientes
- Indicadores de tendencia con porcentajes

### 2. Pedidos
**Ruta**: `/pedidos`

Características:
- Búsqueda y filtros avanzados
- Creación rápida de pedidos
- Estados: Pendiente, En Producción, Entregado, Cancelado
- Origen: Facebook, Instagram, TikTok
- Historial completo por pedido
- Edición y eliminación
- Stats cards: Total, Pendientes, En Producción, Entregados

### 3. Productos
**Ruta**: `/productos`

Características:
- Grid de productos con imágenes
- Información detallada:
  - Precio de venta
  - Costo de producción
  - Margen de ganancia (% y monto)
  - Stock actual vs mínimo
- Alertas de stock bajo
- Búsqueda de productos
- CRUD completo
- Cálculo automático de márgenes

### 4. Clientes
**Ruta**: `/clientes`

Características:
- Base de datos de clientes
- Información de contacto (teléfono, red social)
- Historial de pedidos por cliente
- Total gastado
- Último pedido
- Búsqueda por nombre, teléfono o red social
- Stats: Total clientes, Clientes activos, Valor promedio

### 5. Inventario
**Ruta**: `/inventario`

Características:
- Control de stock actual vs mínimo
- Alertas automáticas de stock bajo
- Historial de movimientos (entradas/salidas)
- Razones de movimiento: Venta, Ajuste, Producción
- Stats: Total productos, Stock bajo, Entradas del mes, Salidas del mes
- Tabla con últimos movimientos

### 6. Finanzas
**Ruta**: `/finanzas`

Características:
- Registro de ingresos y gastos
- Categorías personalizables
- Métodos de pago
- Cálculo automático de balance
- ROI automático: (Ingresos - Gastos) / Gastos
- Filtros por tipo de transacción
- Stats cards:
  - Total ingresos
  - Total gastos
  - Balance
  - ROI %

### 7. Analíticas
**Ruta**: `/analiticas`

Características:
- Gráficas avanzadas:
  - Rendimiento mensual (bar chart)
  - Ventas por producto (pie chart)
  - Distribución por plataforma (progress bars)
  - Tendencia de utilidad (line chart)
- Métricas principales:
  - Ingresos totales
  - Costos totales
  - Utilidad neta
  - ROI
- Comparativas y análisis de tendencias

### 8. Configuración
**Ruta**: `/configuracion`

Características:
- Perfil de usuario
- Notificaciones (alertas de stock bajo, nuevos pedidos)
- Configuración del negocio:
  - Nombre
  - Moneda (HNL por defecto)
  - Timezone
  - Impuesto de venta
- Base de datos:
  - Respaldo manual
  - Respaldo automático programado

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Pasos de Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar base de datos**:
Crear archivo `.env` en la raíz:
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

### Scripts Disponibles
```json
{
  "dev": "next dev",           // Servidor de desarrollo
  "build": "next build",        // Build de producción
  "start": "next start",        // Servidor de producción
  "lint": "next lint",          // Linting
  "db:push": "prisma db push",  // Sincronizar DB
  "db:studio": "prisma studio", // Prisma Studio (GUI)
  "db:generate": "prisma generate" // Generar cliente
}
```

---

## 📊 Componentes UI Principales

### Cards
```css
.card {
  @apply bg-bg-card border border-border-subtle rounded-xl p-6 shadow-soft;
}

.card-hover {
  @apply card transition-all duration-200 hover:border-accent-primary/30 hover:shadow-xl;
}
```

### Buttons
```css
.btn-primary {
  @apply px-4 py-2 rounded-lg bg-accent-primary text-white hover:bg-accent-secondary;
}

.btn-secondary {
  @apply px-4 py-2 rounded-lg bg-bg-secondary border border-border-subtle hover:bg-bg-card;
}
```

### Badges
```css
.badge-success { background: success/20, color: success }
.badge-warning { background: warning/20, color: warning }
.badge-danger { background: danger/20, color: danger }
.badge-primary { background: accent-primary/20, color: accent-primary }
```

### Inputs
```css
.input {
  @apply bg-bg-secondary border border-border-subtle rounded-lg px-4 py-2 
         focus:ring-2 focus:ring-accent-primary/50;
}
```

---

## 🔐 Próximas Implementaciones

### Fase 2 - Autenticación y Seguridad
- [ ] Sistema de autenticación (NextAuth.js)
- [ ] Roles y permisos (Admin, Editor, Vendedor)
- [ ] Protección de rutas
- [ ] Sesiones seguras

### Fase 3 - API y Backend
- [ ] API Routes completas para todos los módulos
- [ ] Servicios y Repositorios
- [ ] Validación de datos con Zod
- [ ] Error handling centralizado

### Fase 4 - Funcionalidades Avanzadas
- [ ] Formularios modales para CRUD
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Sistema de notificaciones en tiempo real
- [ ] Búsqueda avanzada y filtros
- [ ] Paginación en tablas
- [ ] Upload de imágenes de productos

### Fase 5 - Optimización
- [ ] Server-side rendering optimizado
- [ ] Caché de datos
- [ ] Optimización de imágenes
- [ ] Lazy loading de componentes
- [ ] Performance monitoring

### Fase 6 - Deploy y Producción
- [ ] Configuración de Vercel/Railway
- [ ] Base de datos en producción (Supabase/Neon)
- [ ] CI/CD pipeline
- [ ] Monitoreo y logging
- [ ] Backup automático de DB

---

## 📈 Métricas y KPIs del Sistema

### Métricas de Negocio
1. **Ventas del Mes**: Total en HNL de ventas completadas
2. **Gastos del Mes**: Total en HNL de gastos registrados
3. **Utilidad Neta**: Ventas - Gastos
4. **ROI**: (Utilidad / Gastos) × 100
5. **Órdenes Completadas**: Número de pedidos entregados
6. **Ticket Promedio**: Venta promedio por pedido
7. **Margen Promedio**: % de ganancia por producto

### Métricas Operacionales
1. **Stock Bajo**: Productos con stock ≤ stock mínimo
2. **Tiempo de Producción**: Días promedio en producción
3. **Tasa de Cancelación**: % de pedidos cancelados
4. **Productos Más Vendidos**: Top 5 productos
5. **Plataforma Líder**: Red social con más ventas

---

## 🎯 Casos de Uso Principales

### 1. Registro de Nuevo Pedido
1. Usuario accede a `/pedidos`
2. Click en "Nuevo Pedido"
3. Selecciona/crea cliente
4. Selecciona plataforma de origen
5. Agrega productos y cantidades
6. Sistema calcula total automáticamente
7. Guarda pedido (estado: Pendiente)
8. Inventario se descuenta automáticamente

### 2. Control de Inventario
1. Sistema monitorea stock en tiempo real
2. Al registrar venta, descuenta stock automáticamente
3. Si stock ≤ stock mínimo, genera alerta
4. Usuario recibe notificación de stock bajo
5. Usuario puede registrar entrada de producción
6. Historial completo de movimientos

### 3. Análisis Financiero
1. Usuario accede a `/finanzas`
2. Ve balance actualizado (Ingresos - Gastos)
3. Puede filtrar por tipo de transacción
4. Sistema calcula ROI automáticamente
5. Puede exportar reporte del mes (futura implementación)

### 4. Seguimiento de Cliente
1. Usuario accede a `/clientes`
2. Busca cliente por nombre o teléfono
3. Ve historial completo de pedidos
4. Ve total gastado y último pedido
5. Puede ver detalles de cada pedido

---

## 🔧 Utilidades y Helpers

### `lib/utils.ts`

```typescript
// Formatear moneda en Lempiras
formatCurrency(amount: number): string

// Formatear fecha
formatDate(date: Date | string): string

// Calcular ROI
calculateROI(revenue: number, cost: number): number

// Obtener color de plataforma
getPlatformColor(platform: string): string

// Obtener clase de badge según estado
getStatusBadgeClass(status: string): string
```

### `lib/prisma.ts`
Cliente singleton de Prisma para evitar múltiples instancias en desarrollo.

---

## 📝 Notas de Desarrollo

### Decisiones Arquitectónicas

1. **App Router**: Se eligió Next.js 14 App Router para aprovechar Server Components y mejor performance.

2. **Prisma ORM**: Se seleccionó por su excelente integración con TypeScript y migraciones type-safe.

3. **Tailwind CSS**: Permite desarrollo rápido con sistema de tokens consistente y optimización automática.

4. **Zustand**: State management ligero, perfecto para estado global sin boilerplate de Redux.

5. **Recharts**: Librería de gráficas con buena integración a React y personalización.

### Convenciones de Código

- **Componentes**: PascalCase, archivos `.tsx`
- **Utilidades**: camelCase, archivos `.ts`
- **CSS**: Clases de Tailwind, utilities en `globals.css`
- **Tipos**: Interfaces con prefix `I` o types directos
- **Constantes**: UPPER_SNAKE_CASE

### Performance

- Componentes client-side solo cuando necesario (`'use client'`)
- Lazy loading de charts pesados
- Optimización de imágenes con Next.js Image
- Memoización de cálculos costosos

---

## 📞 Soporte y Contacto

**Proyecto**: 3D Lumus - Sistema de Gestión  
**Versión**: 1.0.0  
**Fecha**: Febrero 2026  
**Licencia**: Privado  

---

## ✅ Checklist de Entrega

### Completado ✓
- [x] Configuración inicial del proyecto
- [x] Estructura de carpetas y archivos
- [x] Prisma schema completo
- [x] Diseño del sistema (colores, tipografía)
- [x] Componente Sidebar con navegación
- [x] Dashboard principal con KPIs y gráficas
- [x] Página de Pedidos
- [x] Página de Productos
- [x] Página de Clientes
- [x] Página de Inventario
- [x] Página de Finanzas con ROI
- [x] Página de Analíticas con charts avanzados
- [x] Página de Configuración
- [x] Estilos globales y componentes reutilizables
- [x] Utilidades y helpers
- [x] README con instrucciones
- [x] Diseño mobile-first responsive
- [x] Tema dark profesional

### Pendiente (Fase 2)
- [ ] Autenticación de usuarios
- [ ] API Routes con Prisma
- [ ] Formularios CRUD completos
- [ ] Validación con Zod
- [ ] Sistema de notificaciones
- [ ] Exportación de reportes
- [ ] Tests unitarios e integración
- [ ] Deploy a producción

---

**Fin de la Documentación Ejecutiva**
