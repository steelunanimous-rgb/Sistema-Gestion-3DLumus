# 🗄️ Configuración de Base de Datos

## Opción 1: Base de Datos en la Nube (Recomendado - Rápido)

### Usando Neon (PostgreSQL Serverless) - GRATIS

1. **Crear cuenta en Neon**:
   - Ve a: https://neon.tech
   - Regístrate gratis (puedes usar Google/GitHub)

2. **Crear proyecto**:
   - Click en "Create Project"
   - Nombre: `3dlumus`
   - Región: Selecciona la más cercana
   - Click "Create Project"

3. **Copiar connection string**:
   - Verás un string como: `postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require`
   - Cópialo completo

4. **Pegar en .env**:
   - Abre el archivo `.env` en la raíz del proyecto
   - Reemplaza la línea `DATABASE_URL=...` con tu connection string
   - Ejemplo:
     ```
     DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
     ```

5. **Sincronizar base de datos**:
   ```bash
   npm run db:push
   ```

---

## Opción 2: PostgreSQL Local

### Windows

1. **Descargar PostgreSQL**:
   - https://www.postgresql.org/download/windows/
   - Descarga el instalador

2. **Instalar**:
   - Ejecutar el instalador
   - Puerto: 5432 (default)
   - Usuario: postgres
   - Contraseña: (elige una, ej: postgres)

3. **Crear base de datos**:
   ```bash
   # Abrir psql (busca "SQL Shell" en inicio)
   CREATE DATABASE 3dlumus;
   ```

4. **Actualizar .env**:
   ```
   DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/3dlumus?schema=public"
   ```

5. **Sincronizar**:
   ```bash
   npm run db:push
   ```

---

## ¿Qué opción prefieres?

**Te recomiendo Opción 1 (Neon)** porque:
- ✅ No necesitas instalar nada
- ✅ Setup en 2 minutos
- ✅ Gratis para desarrollo
- ✅ Funciona desde cualquier computadora

**Dime cuando tengas la connection string** y continuamos con las APIs.
