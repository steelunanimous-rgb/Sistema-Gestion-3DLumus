# 🎨 Guía de Diseño - 3D Lumus

## Paleta de Colores

### Backgrounds
```css
--bg-primary: #121212    /* Fondo principal de la app */
--bg-secondary: #181818  /* Fondo del sidebar */
--bg-card: #1E1E1E       /* Fondo de cards */
--border-subtle: #2A2A2A /* Bordes sutiles */
```

### Text Colors
```css
--text-primary: #FFFFFF    /* Texto principal (títulos, números importantes) */
--text-secondary: #B5B5B5  /* Texto secundario (labels, descripciones) */
--text-muted: #8A8A8A      /* Texto apagado (placeholders, hints) */
```

### Accent Colors
```css
--accent-primary: #F7931A   /* Naranja principal - Solo para: */
                            /* - Gráficas principales */
                            /* - KPIs destacados */
                            /* - CTAs importantes */
                            /* - Estados activos */
                            
--accent-secondary: #FBB040 /* Naranja suave - Hover states */

--success: #3DD598          /* Verde - Estados exitosos, utilidades */
--danger: #FF6B6B           /* Rojo - Estados de error, gastos */
--warning: #FFC542          /* Amarillo - Alertas, estados en proceso */
```

---

## Tipografía

### Fuente: Inter (Google Fonts)

```css
/* Regular - Texto normal */
font-weight: 400;

/* Medium - Subtítulos, labels importantes */
font-weight: 500;

/* Semibold - Títulos, números financieros */
font-weight: 600;

/* Bold - Títulos principales */
font-weight: 700;
```

### Tamaños Recomendados
```css
/* Títulos de página */
h1: text-3xl (30px), font-bold

/* Títulos de sección */
h2: text-lg (18px), font-semibold

/* Subtítulos */
h3: text-base (16px), font-medium

/* Texto normal */
p: text-sm (14px), font-normal

/* Números grandes (KPIs) */
.kpi-number: text-2xl (24px), font-bold

/* Texto pequeño (hints) */
small: text-xs (12px), font-normal
```

---

## Componentes

### Cards

#### Card Básico
```tsx
<div className="card">
  {/* Contenido */}
</div>
```
Propiedades:
- Background: `bg-card` (#1E1E1E)
- Border: `border border-border-subtle` (#2A2A2A)
- Radius: `rounded-xl` (16px)
- Padding: `p-6` (24px)
- Shadow: `shadow-soft`

#### Card con Hover
```tsx
<div className="card-hover">
  {/* Contenido interactivo */}
</div>
```
Propiedades adicionales:
- Hover border: `accent-primary/30`
- Hover shadow: `shadow-xl`
- Transition: `duration-200`

---

### Buttons

#### Primary Button
```tsx
<button className="btn-primary flex items-center gap-2">
  <Icon size={20} />
  Texto del Botón
</button>
```
Uso: Acciones principales (Guardar, Crear, Confirmar)
- Background: `accent-primary` (#F7931A)
- Text: `white`
- Hover: `accent-secondary` (#FBB040)

#### Secondary Button
```tsx
<button className="btn-secondary">
  Cancelar
</button>
```
Uso: Acciones secundarias (Cancelar, Volver)
- Background: `bg-secondary` (#181818)
- Border: `border-subtle` (#2A2A2A)
- Hover: `bg-card` (#1E1E1E)

#### Danger Button
```tsx
<button className="btn-danger">
  Eliminar
</button>
```
Uso: Acciones destructivas
- Background: `danger` (#FF6B6B)
- Text: `white`
- Hover: `red-600`

---

### Badges

#### Success Badge
```tsx
<span className="badge-success">Entregado</span>
```
Uso: Estados exitosos, completados
- Background: `success/20` (rgba success, 20%)
- Text: `success` (#3DD598)

#### Warning Badge
```tsx
<span className="badge-warning">En Producción</span>
```
Uso: Estados en proceso, alertas
- Background: `warning/20`
- Text: `warning` (#FFC542)

#### Danger Badge
```tsx
<span className="badge-danger">Cancelado</span>
```
Uso: Estados de error, cancelaciones
- Background: `danger/20`
- Text: `danger` (#FF6B6B)

#### Primary Badge
```tsx
<span className="badge-primary">Pendiente</span>
```
Uso: Estados neutros, pendientes
- Background: `accent-primary/20`
- Text: `accent-primary` (#F7931A)

---

### Inputs

#### Text Input
```tsx
<div>
  <label className="label">Nombre del Producto</label>
  <input 
    type="text" 
    className="input w-full" 
    placeholder="Ej: Lightbox Premium 30x40cm"
  />
</div>
```
Propiedades:
- Background: `bg-secondary` (#181818)
- Border: `border-subtle` (#2A2A2A)
- Radius: `rounded-lg` (8px)
- Padding: `px-4 py-2` (16px 8px)
- Focus ring: `ring-2 ring-accent-primary/50`

#### Select
```tsx
<select className="input w-full">
  <option>Opción 1</option>
  <option>Opción 2</option>
</select>
```

#### Search Input
```tsx
<div className="relative">
  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
  <input 
    type="text"
    placeholder="Buscar..."
    className="input w-full pl-10"
  />
</div>
```

---

### Tables

#### Tabla Completa
```tsx
<div className="card">
  <div className="table-container">
    <table className="table">
      <thead className="table-header">
        <tr>
          <th>Columna 1</th>
          <th>Columna 2</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-row">
          <td>Dato 1</td>
          <td>Dato 2</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

Propiedades:
- Container: `overflow-x-auto`, `rounded-xl`, `border`
- Header: `bg-secondary`, `font-semibold`, `text-secondary`
- Row: `border-b`, `hover:bg-card`
- Cell padding: `px-6 py-4`

---

### KPI Cards

#### Estructura
```tsx
<div className="card-hover">
  <div className="flex items-start justify-between">
    {/* Contenido izquierdo */}
    <div>
      <p className="text-sm text-text-muted mb-1">Título KPI</p>
      <h3 className="text-2xl font-bold text-text-primary mb-2">
        L 67,000
      </h3>
      <div className="flex items-center gap-1">
        <TrendingUp size={16} className="text-success" />
        <span className="text-sm font-semibold text-success">+22%</span>
        <span className="text-xs text-text-muted ml-1">vs mes anterior</span>
      </div>
    </div>
    
    {/* Icono derecho */}
    <div className="p-3 rounded-lg bg-accent-primary/10">
      <DollarSign size={24} className="text-accent-primary" />
    </div>
  </div>
</div>
```

---

### Charts (Recharts)

#### Line Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={salesData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
    <XAxis 
      dataKey="month" 
      stroke="#8A8A8A" 
      style={{ fontSize: '12px' }} 
    />
    <YAxis 
      stroke="#8A8A8A" 
      style={{ fontSize: '12px' }} 
    />
    <Tooltip
      contentStyle={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #2A2A2A',
        borderRadius: '8px',
        color: '#FFFFFF',
      }}
    />
    <Legend />
    <Line
      type="monotone"
      dataKey="ventas"
      stroke="#F7931A"
      strokeWidth={3}
      dot={{ fill: '#F7931A', r: 4 }}
      name="Ventas"
    />
  </LineChart>
</ResponsiveContainer>
```

Colores recomendados para gráficas:
- Línea 1 (Ingresos/Ventas): `#F7931A` (naranja principal)
- Línea 2 (Gastos/Costos): `#FF6B6B` (rojo)
- Línea 3 (Utilidad): `#3DD598` (verde)
- Línea 4: `#FBB040` (naranja secundario)
- Grid: `#2A2A2A`
- Ejes: `#8A8A8A`

---

## Iconos (Lucide React)

### Tamaños Recomendados
```tsx
/* Iconos pequeños (badges, inline) */
<Icon size={12} />

/* Iconos normales (botones, inputs) */
<Icon size={16} />

/* Iconos medianos (sidebar, headers) */
<Icon size={20} />

/* Iconos grandes (KPI cards) */
<Icon size={24} />

/* Iconos extra grandes (placeholders) */
<Icon size={48} />
```

### Iconos por Contexto

#### Navegación
- Dashboard: `LayoutDashboard`
- Pedidos: `ShoppingCart`
- Productos: `Package`
- Clientes: `Users`
- Inventario: `Boxes`
- Finanzas: `DollarSign`
- Analíticas: `BarChart3`
- Configuración: `Settings`

#### Acciones
- Crear: `Plus`
- Editar: `Edit`
- Eliminar: `Trash2`
- Ver: `Eye`
- Buscar: `Search`
- Filtrar: `Filter`
- Cerrar: `X`
- Menú: `Menu`

#### Estados
- Éxito/Subida: `TrendingUp`
- Error/Bajada: `TrendingDown`
- Alerta: `AlertTriangle`
- Info: `Info`
- Usuario: `User`
- Calendario: `Calendar`

---

## Spacing y Layout

### Padding Estándar
```css
/* Cards y containers */
p-6 (24px)

/* Botones */
px-4 py-2 (16px 8px)

/* Inputs */
px-4 py-2 (16px 8px)

/* Sections */
p-4 lg:p-8 (16px mobile, 32px desktop)
```

### Gaps
```css
/* Entre items pequeños (iconos y texto) */
gap-1 (4px)
gap-2 (8px)

/* Entre elementos normales */
gap-4 (16px)

/* Entre secciones */
gap-6 (24px)
gap-8 (32px)
```

### Border Radius
```css
/* Pequeño (badges, small buttons) */
rounded-lg (8px)

/* Normal (cards, inputs, buttons) */
rounded-xl (16px)

/* Completo (avatares, iconos) */
rounded-full
```

---

## Responsive Design

### Breakpoints (Tailwind)
```css
/* Mobile first - Por defecto */
Base: 0px - 640px

/* sm - Tablets pequeñas */
sm: 640px

/* md - Tablets */
md: 768px

/* lg - Desktop */
lg: 1024px

/* xl - Desktop grande */
xl: 1280px
```

### Grid Layouts
```tsx
/* 1 columna en mobile, 2 en tablet, 4 en desktop */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

### Sidebar Responsive
```tsx
/* Mobile: Oculto con transform */
className="-translate-x-full lg:translate-x-0"

/* Desktop: Siempre visible */
className="lg:static"
```

---

## Animaciones

### Fade In
```tsx
<div className="animate-fade-in">
  {/* Contenido */}
</div>
```
Efecto: Fade + translateY desde 10px

### Slide In
```tsx
<div className="animate-slide-in">
  {/* Contenido que entra desde la izquierda */}
</div>
```
Efecto: Fade + translateX desde -20px

### Transitions
```css
/* Estándar para hover, focus */
transition-all duration-200

/* Suave para animaciones grandes */
transition-all duration-300

/* Rápida para micro-interacciones */
transition-colors duration-150
```

---

## Estados de UI

### Loading States
```tsx
<div className="animate-pulse bg-bg-secondary rounded-lg h-20" />
```

### Empty States
```tsx
<div className="text-center py-12">
  <Package size={48} className="text-text-muted mx-auto mb-4" />
  <p className="text-text-muted">No hay productos registrados</p>
</div>
```

### Error States
```tsx
<div className="card border-danger/50 bg-danger/5">
  <AlertTriangle className="text-danger" />
  <p className="text-danger">Error al cargar datos</p>
</div>
```

---

## Best Practices

### 1. Consistencia de Colores
❌ **No hacer**:
```tsx
<div className="bg-red-500">
<div className="text-green-400">
```

✅ **Hacer**:
```tsx
<div className="bg-danger">
<div className="text-success">
```

### 2. Jerarquía Visual
❌ **No hacer**:
```tsx
<h1 className="text-sm font-normal">
```

✅ **Hacer**:
```tsx
<h1 className="text-3xl font-bold text-text-primary">
```

### 3. Uso de Orange (Accent)
❌ **No usar naranja para**:
- Fondos completos
- Texto de párrafos
- Bordes de todos los elementos

✅ **Usar naranja solo para**:
- CTAs principales
- Gráficas destacadas
- KPIs activos
- Estados importantes

### 4. Spacing Consistente
❌ **No hacer**:
```tsx
<div className="p-3 mb-5 gap-7">
```

✅ **Hacer** (usar escala de 4):
```tsx
<div className="p-4 mb-6 gap-4">
```

### 5. Mobile-First
❌ **No hacer**:
```tsx
<div className="lg:grid-cols-1 grid-cols-4">
```

✅ **Hacer**:
```tsx
<div className="grid-cols-1 lg:grid-cols-4">
```

---

## Ejemplos Completos

### Card de Producto
```tsx
<div className="card-hover">
  {/* Imagen */}
  <div className="bg-bg-secondary rounded-lg h-48 mb-4 flex items-center justify-center">
    <Package size={48} className="text-text-muted" />
  </div>

  {/* Título y descripción */}
  <h3 className="text-lg font-semibold text-text-primary mb-2">
    Lightbox Premium 30x40cm
  </h3>
  <p className="text-sm text-text-muted mb-4 line-clamp-2">
    Lightbox de alta calidad con marco de aluminio
  </p>

  {/* Badge de stock */}
  <span className="badge-success w-fit mb-4">Stock: 15 unidades</span>

  {/* Precios */}
  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border-subtle">
    <div>
      <p className="text-xs text-text-muted mb-1">Precio Venta</p>
      <p className="text-xl font-bold text-accent-primary">L 1,200</p>
    </div>
    <div>
      <p className="text-xs text-text-muted mb-1">Costo</p>
      <p className="text-lg font-semibold text-text-secondary">L 600</p>
    </div>
  </div>

  {/* Botones */}
  <div className="flex gap-2">
    <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
      <Edit size={16} />
      Editar
    </button>
    <button className="btn-secondary p-2">
      <Trash2 size={16} className="text-danger" />
    </button>
  </div>
</div>
```

---

**Fin de la Guía de Diseño**
