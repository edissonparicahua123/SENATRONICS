# 🧪 Guía Completa de Testing con Hoppscotch - SENATRONICS

## 📋 Índice

1. [Configuración Inicial](#configuración-inicial)
2. [Autenticación](#autenticación)
3. [CRUD Usuarios](#crud-usuarios)
4. [CRUD Categorías](#crud-categorías)
5. [CRUD Proveedores](#crud-proveedores)
6. [CRUD Almacenes](#crud-almacenes)
7. [CRUD Productos](#crud-productos)
8. [CRUD Movimientos de Inventario](#crud-movimientos-de-inventario)
9. [Flujo de Prueba Completo](#flujo-de-prueba-completo)

---

## 🚀 Configuración Inicial

### Variables de Entorno en Hoppscotch

Crea las siguientes variables de entorno en Hoppscotch:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `baseURL` | `http://localhost:3000` | URL base del servidor |
| `token` | *(vacío inicialmente)* | Token JWT (se llenará después del login) |

### Headers Globales

Para todas las peticiones **protegidas**, usa:

```
Authorization: Bearer <<token>>
Content-Type: application/json
```

---

## 🔐 Autenticación

### 1. Registro de Usuario

**Endpoint:** `POST {{baseURL}}/api/usuarios/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Admin Principal",
  "email": "admin@senatronics.com",
  "password": "admin123",
  "rol": "admin"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "usuario": {
    "id_usuario": 1,
    "nombre": "Admin Principal",
    "email": "admin@senatronics.com",
    "rol": "admin"
  }
}
```

---

### 2. Login

**Endpoint:** `POST {{baseURL}}/api/usuarios/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "admin@senatronics.com",
  "password": "admin123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDM2MDB9.xxxxx"
}
```

> ⚠️ **IMPORTANTE:** Copia el token de la respuesta y guárdalo en la variable de entorno `token` en Hoppscotch.

---

## 👥 CRUD Usuarios

> 🔒 **Nota:** Todas las operaciones de usuarios están protegidas excepto `register` y `login`.

### DTO Usuario

```typescript
{
  id_usuario: number,      // Auto-generado
  nombre: string,          // Requerido
  email: string,           // Requerido, único
  password: string,        // Requerido (encriptado)
  rol: string              // Requerido (ej: "admin", "usuario")
}
```

### 1. Listar Todos los Usuarios

**Endpoint:** `GET {{baseURL}}/api/usuarios`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
[
  {
    "id_usuario": 1,
    "nombre": "Admin Principal",
    "email": "admin@senatronics.com",
    "rol": "admin"
  }
]
```

---

### 2. Obtener Usuario por ID

**Endpoint:** `GET {{baseURL}}/api/usuarios/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "id_usuario": 1,
  "nombre": "Admin Principal",
  "email": "admin@senatronics.com",
  "rol": "admin"
}
```

---

### 3. Actualizar Usuario

**Endpoint:** `PUT {{baseURL}}/api/usuarios/1`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Admin Actualizado",
  "email": "admin@senatronics.com",
  "rol": "superadmin"
}
```

**Respuesta (200):**
```json
{
  "message": "Usuario actualizado exitosamente",
  "usuario": {
    "id_usuario": 1,
    "nombre": "Admin Actualizado",
    "email": "admin@senatronics.com",
    "rol": "superadmin"
  }
}
```

---

### 4. Eliminar Usuario

**Endpoint:** `DELETE {{baseURL}}/api/usuarios/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "message": "Usuario eliminado exitosamente"
}
```

---

## 🏷️ CRUD Categorías

> 🔒 **Todas las operaciones requieren autenticación**

### DTO Categoría

```typescript
{
  id_categoria: number,    // Auto-generado
  nombre: string,          // Requerido
  descripción: string      // Opcional
}
```

### 1. Crear Categoría

**Endpoint:** `POST {{baseURL}}/api/categorias`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Microcontroladores",
  "descripción": "Placas y módulos programables Arduino, ESP32, Raspberry Pi"
}
```

**Respuesta (201):**
```json
{
  "id_categoria": 1,
  "nombre": "Microcontroladores",
  "descripción": "Placas y módulos programables Arduino, ESP32, Raspberry Pi"
}
```

---

### 2. Listar Todas las Categorías

**Endpoint:** `GET {{baseURL}}/api/categorias`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
[
  {
    "id_categoria": 1,
    "nombre": "Microcontroladores",
    "descripción": "Placas y módulos programables Arduino, ESP32, Raspberry Pi"
  },
  {
    "id_categoria": 2,
    "nombre": "Sensores",
    "descripción": "Sensores de temperatura, humedad, movimiento, etc."
  }
]
```

---

### 3. Obtener Categoría por ID

**Endpoint:** `GET {{baseURL}}/api/categorias/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "id_categoria": 1,
  "nombre": "Microcontroladores",
  "descripción": "Placas y módulos programables Arduino, ESP32, Raspberry Pi"
}
```

---

### 4. Actualizar Categoría

**Endpoint:** `PUT {{baseURL}}/api/categorias/1`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Microcontroladores y SBC",
  "descripción": "Placas programables y computadoras de placa única"
}
```

**Respuesta (200):**
```json
{
  "message": "Categoría actualizada exitosamente",
  "categoria": {
    "id_categoria": 1,
    "nombre": "Microcontroladores y SBC",
    "descripción": "Placas programables y computadoras de placa única"
  }
}
```

---

### 5. Eliminar Categoría

**Endpoint:** `DELETE {{baseURL}}/api/categorias/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "message": "Categoría eliminada exitosamente"
}
```

---

## 🏢 CRUD Proveedores

> 🔒 **Todas las operaciones requieren autenticación**

### DTO Proveedor

```typescript
{
  id_proveedor: number,    // Auto-generado
  nombre: string,          // Requerido
  teléfono: string,        // Opcional
  correo: string,          // Opcional
  dirección: string        // Opcional
}
```

### 1. Crear Proveedor

**Endpoint:** `POST {{baseURL}}/api/proveedores`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "ElectroComponents SAC",
  "teléfono": "+51 987654321",
  "correo": "ventas@electrocomponents.com",
  "dirección": "Av. Industrial 123, Lima, Perú"
}
```

**Respuesta (201):**
```json
{
  "id_proveedor": 1,
  "nombre": "ElectroComponents SAC",
  "teléfono": "+51 987654321",
  "correo": "ventas@electrocomponents.com",
  "dirección": "Av. Industrial 123, Lima, Perú"
}
```

---

### 2. Listar Todos los Proveedores

**Endpoint:** `GET {{baseURL}}/api/proveedores`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
[
  {
    "id_proveedor": 1,
    "nombre": "ElectroComponents SAC",
    "teléfono": "+51 987654321",
    "correo": "ventas@electrocomponents.com",
    "dirección": "Av. Industrial 123, Lima, Perú"
  },
  {
    "id_proveedor": 2,
    "nombre": "TechSupply Peru",
    "teléfono": "+51 912345678",
    "correo": "info@techsupply.pe",
    "dirección": "Jr. Tecnología 456, Callao, Perú"
  }
]
```

---

### 3. Obtener Proveedor por ID

**Endpoint:** `GET {{baseURL}}/api/proveedores/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "id_proveedor": 1,
  "nombre": "ElectroComponents SAC",
  "teléfono": "+51 987654321",
  "correo": "ventas@electrocomponents.com",
  "dirección": "Av. Industrial 123, Lima, Perú"
}
```

---

### 4. Actualizar Proveedor

**Endpoint:** `PUT {{baseURL}}/api/proveedores/1`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "ElectroComponents SAC",
  "teléfono": "+51 987654321",
  "correo": "ventas.nuevas@electrocomponents.com",
  "dirección": "Av. Industrial 123, Oficina 501, Lima, Perú"
}
```

**Respuesta (200):**
```json
{
  "message": "Proveedor actualizado exitosamente",
  "proveedor": {
    "id_proveedor": 1,
    "nombre": "ElectroComponents SAC",
    "teléfono": "+51 987654321",
    "correo": "ventas.nuevas@electrocomponents.com",
    "dirección": "Av. Industrial 123, Oficina 501, Lima, Perú"
  }
}
```

---

### 5. Eliminar Proveedor

**Endpoint:** `DELETE {{baseURL}}/api/proveedores/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "message": "Proveedor eliminado exitosamente"
}
```

---

## 🏭 CRUD Almacenes

> 🔒 **Todas las operaciones requieren autenticación**

### DTO Almacén

```typescript
{
  id_almacen: number,      // Auto-generado
  nombre: string,          // Requerido
  ubicación: string        // Opcional
}
```

### 1. Crear Almacén

**Endpoint:** `POST {{baseURL}}/api/almacenes`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Almacén Principal",
  "ubicación": "Planta Baja - Zona A"
}
```

**Respuesta (201):**
```json
{
  "id_almacen": 1,
  "nombre": "Almacén Principal",
  "ubicación": "Planta Baja - Zona A"
}
```

---

### 2. Listar Todos los Almacenes

**Endpoint:** `GET {{baseURL}}/api/almacenes`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
[
  {
    "id_almacen": 1,
    "nombre": "Almacén Principal",
    "ubicación": "Planta Baja - Zona A"
  },
  {
    "id_almacen": 2,
    "nombre": "Almacén Secundario",
    "ubicación": "Segundo Piso - Zona B"
  }
]
```

---

### 3. Obtener Almacén por ID

**Endpoint:** `GET {{baseURL}}/api/almacenes/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "id_almacen": 1,
  "nombre": "Almacén Principal",
  "ubicación": "Planta Baja - Zona A"
}
```

---

### 4. Actualizar Almacén

**Endpoint:** `PUT {{baseURL}}/api/almacenes/1`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Almacén Principal Ampliado",
  "ubicación": "Planta Baja - Zonas A y B"
}
```

**Respuesta (200):**
```json
{
  "message": "Almacén actualizado exitosamente",
  "almacen": {
    "id_almacen": 1,
    "nombre": "Almacén Principal Ampliado",
    "ubicación": "Planta Baja - Zonas A y B"
  }
}
```

---

### 5. Eliminar Almacén

**Endpoint:** `DELETE {{baseURL}}/api/almacenes/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "message": "Almacén eliminado exitosamente"
}
```

---

## 📦 CRUD Productos

> 🔒 **Todas las operaciones requieren autenticación**

### DTO Producto

```typescript
{
  id_producto: number,         // Auto-generado
  nombre: string,              // Requerido
  marca: string,               // Opcional
  modelo: string,              // Opcional
  categoría: string,           // Opcional
  descripción: string,         // Opcional
  precio_compra: decimal,      // Opcional (10,2)
  precio_venta: decimal,       // Opcional (10,2)
  stock_actual: integer,       // Default: 0
  stock_minimo: integer,       // Default: 0
  id_categoria: number,        // Foreign Key (Categoría)
  id_proveedor: number,        // Foreign Key (Proveedor)
  id_almacen: number           // Foreign Key (Almacén)
}
```

### 1. Crear Producto

**Endpoint:** `POST {{baseURL}}/api/productos`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Arduino Uno R3",
  "marca": "Arduino",
  "modelo": "A000066",
  "categoría": "Microcontrolador",
  "descripción": "Placa de desarrollo con microcontrolador ATmega328P",
  "precio_compra": 18.50,
  "precio_venta": 25.00,
  "stock_actual": 50,
  "stock_minimo": 10,
  "id_categoria": 1,
  "id_proveedor": 1,
  "id_almacen": 1
}
```

**Respuesta (201):**
```json
{
  "id_producto": 1,
  "nombre": "Arduino Uno R3",
  "marca": "Arduino",
  "modelo": "A000066",
  "categoría": "Microcontrolador",
  "descripción": "Placa de desarrollo con microcontrolador ATmega328P",
  "precio_compra": "18.50",
  "precio_venta": "25.00",
  "stock_actual": 50,
  "stock_minimo": 10,
  "id_categoria": 1,
  "id_proveedor": 1,
  "id_almacen": 1
}
```

---

### 2. Listar Todos los Productos

**Endpoint:** `GET {{baseURL}}/api/productos`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Arduino Uno R3",
    "marca": "Arduino",
    "modelo": "A000066",
    "categoría": "Microcontrolador",
    "descripción": "Placa de desarrollo con microcontrolador ATmega328P",
    "precio_compra": "18.50",
    "precio_venta": "25.00",
    "stock_actual": 50,
    "stock_minimo": 10,
    "id_categoria": 1,
    "id_proveedor": 1,
    "id_almacen": 1,
    "Categoria": {
      "id_categoria": 1,
      "nombre": "Microcontroladores"
    },
    "Proveedor": {
      "id_proveedor": 1,
      "nombre": "ElectroComponents SAC"
    },
    "Almacen": {
      "id_almacen": 1,
      "nombre": "Almacén Principal"
    }
  }
]
```

---

### 3. Obtener Producto por ID

**Endpoint:** `GET {{baseURL}}/api/productos/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "id_producto": 1,
  "nombre": "Arduino Uno R3",
  "marca": "Arduino",
  "modelo": "A000066",
  "categoría": "Microcontrolador",
  "descripción": "Placa de desarrollo con microcontrolador ATmega328P",
  "precio_compra": "18.50",
  "precio_venta": "25.00",
  "stock_actual": 50,
  "stock_minimo": 10,
  "id_categoria": 1,
  "id_proveedor": 1,
  "id_almacen": 1,
  "Categoria": {
    "id_categoria": 1,
    "nombre": "Microcontroladores",
    "descripción": "Placas programables"
  },
  "Proveedor": {
    "id_proveedor": 1,
    "nombre": "ElectroComponents SAC",
    "teléfono": "+51 987654321"
  },
  "Almacen": {
    "id_almacen": 1,
    "nombre": "Almacén Principal",
    "ubicación": "Planta Baja - Zona A"
  }
}
```

---

### 4. Actualizar Producto

**Endpoint:** `PUT {{baseURL}}/api/productos/1`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Arduino Uno R3",
  "marca": "Arduino",
  "modelo": "A000066",
  "categoría": "Microcontrolador",
  "descripción": "Placa de desarrollo con microcontrolador ATmega328P - Versión mejorada",
  "precio_compra": 18.50,
  "precio_venta": 27.00,
  "stock_actual": 45,
  "stock_minimo": 10,
  "id_categoria": 1,
  "id_proveedor": 1,
  "id_almacen": 1
}
```

**Respuesta (200):**
```json
{
  "message": "Producto actualizado exitosamente",
  "producto": {
    "id_producto": 1,
    "nombre": "Arduino Uno R3",
    "precio_venta": "27.00",
    "stock_actual": 45
  }
}
```

---

### 5. Eliminar Producto

**Endpoint:** `DELETE {{baseURL}}/api/productos/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "message": "Producto eliminado exitosamente"
}
```

---

## 📊 CRUD Movimientos de Inventario

> 🔒 **Todas las operaciones requieren autenticación**

### DTO Movimiento de Inventario

```typescript
{
  id_movimiento: number,           // Auto-generado
  tipo_movimiento: enum,           // Requerido: 'entrada', 'salida', 'ajuste'
  cantidad: integer,               // Requerido
  fecha: datetime,                 // Default: NOW()
  usuario_responsable: string,     // Opcional
  motivo: string,                  // Opcional
  id_producto: number              // Foreign Key (Producto)
}
```

### 1. Crear Movimiento de Inventario

**Endpoint:** `POST {{baseURL}}/api/movimientos`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body - Entrada (JSON):**
```json
{
  "tipo_movimiento": "entrada",
  "cantidad": 100,
  "usuario_responsable": "Admin Principal",
  "motivo": "Compra a proveedor ElectroComponents SAC",
  "id_producto": 1
}
```

**Body - Salida (JSON):**
```json
{
  "tipo_movimiento": "salida",
  "cantidad": 15,
  "usuario_responsable": "Admin Principal",
  "motivo": "Venta a cliente corporativo",
  "id_producto": 1
}
```

**Body - Ajuste (JSON):**
```json
{
  "tipo_movimiento": "ajuste",
  "cantidad": -5,
  "usuario_responsable": "Admin Principal",
  "motivo": "Corrección por inventario físico - productos dañados",
  "id_producto": 1
}
```

**Respuesta (201):**
```json
{
  "id_movimiento": 1,
  "tipo_movimiento": "entrada",
  "cantidad": 100,
  "fecha": "2025-11-26T23:00:00.000Z",
  "usuario_responsable": "Admin Principal",
  "motivo": "Compra a proveedor ElectroComponents SAC",
  "id_producto": 1
}
```

---

### 2. Listar Todos los Movimientos

**Endpoint:** `GET {{baseURL}}/api/movimientos`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
[
  {
    "id_movimiento": 1,
    "tipo_movimiento": "entrada",
    "cantidad": 100,
    "fecha": "2025-11-26T23:00:00.000Z",
    "usuario_responsable": "Admin Principal",
    "motivo": "Compra a proveedor ElectroComponents SAC",
    "id_producto": 1,
    "Producto": {
      "id_producto": 1,
      "nombre": "Arduino Uno R3",
      "stock_actual": 150
    }
  },
  {
    "id_movimiento": 2,
    "tipo_movimiento": "salida",
    "cantidad": 15,
    "fecha": "2025-11-26T23:30:00.000Z",
    "usuario_responsable": "Admin Principal",
    "motivo": "Venta a cliente corporativo",
    "id_producto": 1,
    "Producto": {
      "id_producto": 1,
      "nombre": "Arduino Uno R3",
      "stock_actual": 135
    }
  }
]
```

---

### 3. Obtener Movimiento por ID

**Endpoint:** `GET {{baseURL}}/api/movimientos/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "id_movimiento": 1,
  "tipo_movimiento": "entrada",
  "cantidad": 100,
  "fecha": "2025-11-26T23:00:00.000Z",
  "usuario_responsable": "Admin Principal",
  "motivo": "Compra a proveedor ElectroComponents SAC",
  "id_producto": 1,
  "Producto": {
    "id_producto": 1,
    "nombre": "Arduino Uno R3",
    "marca": "Arduino",
    "modelo": "A000066",
    "stock_actual": 150
  }
}
```

---

### 4. Actualizar Movimiento

**Endpoint:** `PUT {{baseURL}}/api/movimientos/1`

**Headers:**
```
Authorization: Bearer <<token>>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "tipo_movimiento": "entrada",
  "cantidad": 120,
  "usuario_responsable": "Admin Principal",
  "motivo": "Compra a proveedor ElectroComponents SAC - Cantidad corregida",
  "id_producto": 1
}
```

**Respuesta (200):**
```json
{
  "message": "Movimiento actualizado exitosamente",
  "movimiento": {
    "id_movimiento": 1,
    "tipo_movimiento": "entrada",
    "cantidad": 120,
    "motivo": "Compra a proveedor ElectroComponents SAC - Cantidad corregida"
  }
}
```

---

### 5. Eliminar Movimiento

**Endpoint:** `DELETE {{baseURL}}/api/movimientos/1`

**Headers:**
```
Authorization: Bearer <<token>>
```

**Respuesta (200):**
```json
{
  "message": "Movimiento eliminado exitosamente"
}
```

---

## 🔄 Flujo de Prueba Completo

### Orden Recomendado para Testing

Sigue este orden para probar el sistema completo:

#### 1️⃣ **Autenticación**
```
1. POST /api/usuarios/register (Crear usuario admin)
2. POST /api/usuarios/login (Obtener token)
3. Guardar token en variable de entorno
```

#### 2️⃣ **Crear Datos Maestros**
```
4. POST /api/categorias (Crear categoría "Microcontroladores")
5. POST /api/proveedores (Crear proveedor "ElectroComponents SAC")
6. POST /api/almacenes (Crear almacén "Almacén Principal")
```

#### 3️⃣ **Crear Productos**
```
7. POST /api/productos (Crear producto "Arduino Uno R3")
   - Usar id_categoria, id_proveedor, id_almacen de los pasos anteriores
```

#### 4️⃣ **Registrar Movimientos**
```
8. POST /api/movimientos (Entrada de 100 unidades)
9. POST /api/movimientos (Salida de 15 unidades)
10. GET /api/productos/1 (Verificar stock actualizado)
```

#### 5️⃣ **Operaciones de Lectura**
```
11. GET /api/categorias (Listar todas)
12. GET /api/proveedores (Listar todos)
13. GET /api/almacenes (Listar todos)
14. GET /api/productos (Listar todos con relaciones)
15. GET /api/movimientos (Listar todos con productos)
```

#### 6️⃣ **Operaciones de Actualización**
```
16. PUT /api/categorias/1 (Actualizar descripción)
17. PUT /api/productos/1 (Actualizar precio)
18. GET /api/productos/1 (Verificar cambios)
```

#### 7️⃣ **Operaciones de Eliminación** (Opcional - cuidado con las relaciones)
```
19. DELETE /api/movimientos/1 (Eliminar movimiento)
20. DELETE /api/productos/1 (Eliminar producto - si no tiene movimientos)
```

---

## 📝 Ejemplos de Datos de Prueba

### Categorías
```json
[
  {"nombre": "Microcontroladores", "descripción": "Arduino, ESP32, Raspberry Pi"},
  {"nombre": "Sensores", "descripción": "Temperatura, humedad, movimiento"},
  {"nombre": "Actuadores", "descripción": "Motores, servos, relés"},
  {"nombre": "Componentes Pasivos", "descripción": "Resistencias, capacitores, diodos"}
]
```

### Proveedores
```json
[
  {
    "nombre": "ElectroComponents SAC",
    "teléfono": "+51 987654321",
    "correo": "ventas@electrocomponents.com",
    "dirección": "Av. Industrial 123, Lima"
  },
  {
    "nombre": "TechSupply Peru",
    "teléfono": "+51 912345678",
    "correo": "info@techsupply.pe",
    "dirección": "Jr. Tecnología 456, Callao"
  }
]
```

### Almacenes
```json
[
  {"nombre": "Almacén Principal", "ubicación": "Planta Baja - Zona A"},
  {"nombre": "Almacén Secundario", "ubicación": "Segundo Piso - Zona B"},
  {"nombre": "Almacén de Tránsito", "ubicación": "Área de Recepción"}
]
```

### Productos
```json
[
  {
    "nombre": "Arduino Uno R3",
    "marca": "Arduino",
    "modelo": "A000066",
    "categoría": "Microcontrolador",
    "descripción": "Placa ATmega328P",
    "precio_compra": 18.50,
    "precio_venta": 25.00,
    "stock_actual": 50,
    "stock_minimo": 10,
    "id_categoria": 1,
    "id_proveedor": 1,
    "id_almacen": 1
  },
  {
    "nombre": "ESP32 DevKit",
    "marca": "Espressif",
    "modelo": "ESP32-WROOM-32",
    "categoría": "Microcontrolador",
    "descripción": "Módulo WiFi y Bluetooth",
    "precio_compra": 12.00,
    "precio_venta": 18.00,
    "stock_actual": 75,
    "stock_minimo": 15,
    "id_categoria": 1,
    "id_proveedor": 1,
    "id_almacen": 1
  },
  {
    "nombre": "Sensor DHT22",
    "marca": "Aosong",
    "modelo": "DHT22",
    "categoría": "Sensor",
    "descripción": "Sensor de temperatura y humedad",
    "precio_compra": 5.50,
    "precio_venta": 8.50,
    "stock_actual": 100,
    "stock_minimo": 20,
    "id_categoria": 2,
    "id_proveedor": 2,
    "id_almacen": 1
  }
]
```

---

## ⚠️ Errores Comunes y Soluciones

### Error 401: "Acceso denegado. No hay token."
**Causa:** No se incluyó el token en el header  
**Solución:** Agregar header `Authorization: Bearer <<token>>`

### Error 401: "Token inválido o expirado"
**Causa:** El token expiró (1 hora) o es incorrecto  
**Solución:** Hacer login nuevamente y actualizar el token

### Error 404: "Recurso no encontrado"
**Causa:** El ID especificado no existe  
**Solución:** Verificar que el ID existe con GET antes de actualizar/eliminar

### Error 400: "Datos inválidos"
**Causa:** Faltan campos requeridos o formato incorrecto  
**Solución:** Verificar el DTO y asegurar que todos los campos requeridos estén presentes

### Error 500: "Error del servidor"
**Causa:** Error en la base de datos o lógica del servidor  
**Solución:** Verificar logs del servidor y conexión a la base de datos

---

## 🎯 Checklist de Testing Completo

- [ ] **Autenticación**
  - [ ] Registro de usuario
  - [ ] Login exitoso
  - [ ] Token guardado en variables

- [ ] **Categorías**
  - [ ] Crear categoría
  - [ ] Listar categorías
  - [ ] Obtener categoría por ID
  - [ ] Actualizar categoría
  - [ ] Eliminar categoría

- [ ] **Proveedores**
  - [ ] Crear proveedor
  - [ ] Listar proveedores
  - [ ] Obtener proveedor por ID
  - [ ] Actualizar proveedor
  - [ ] Eliminar proveedor

- [ ] **Almacenes**
  - [ ] Crear almacén
  - [ ] Listar almacenes
  - [ ] Obtener almacén por ID
  - [ ] Actualizar almacén
  - [ ] Eliminar almacén

- [ ] **Productos**
  - [ ] Crear producto con relaciones
  - [ ] Listar productos con datos relacionados
  - [ ] Obtener producto por ID
  - [ ] Actualizar producto
  - [ ] Eliminar producto

- [ ] **Movimientos de Inventario**
  - [ ] Crear movimiento de entrada
  - [ ] Crear movimiento de salida
  - [ ] Crear movimiento de ajuste
  - [ ] Listar movimientos
  - [ ] Obtener movimiento por ID
  - [ ] Actualizar movimiento
  - [ ] Eliminar movimiento

- [ ] **Verificaciones**
  - [ ] Stock se actualiza correctamente con movimientos
  - [ ] Relaciones entre entidades funcionan
  - [ ] Autenticación protege todas las rutas
  - [ ] Errores se manejan correctamente

---

## 📚 Recursos Adicionales

- **Hoppscotch:** https://hoppscotch.io
- **Documentación JWT:** https://jwt.io
- **Sequelize Docs:** https://sequelize.org

---

## 🎉 ¡Listo para Testing!

Ahora tienes una guía completa para probar **todos los endpoints** de SENATRONICS con Hoppscotch. 

**Recuerda:**
1. Iniciar el servidor: `node index.js`
2. Crear usuario y obtener token
3. Seguir el flujo recomendado
4. Verificar las respuestas

¡Buena suerte con tus pruebas! 🚀
