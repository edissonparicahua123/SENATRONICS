# 🔌 SENATRONICS

Sistema de gestión de inventario para productos electrónicos con autenticación JWT.

## 📋 Descripción

SENATRONICS es una API REST completa para la gestión de inventario de productos electrónicos. Permite administrar productos, categorías, proveedores, almacenes y movimientos de inventario con autenticación segura mediante JSON Web Tokens (JWT).

## ✨ Características

- 🔐 **Autenticación JWT** - Sistema seguro de login y registro
- 📦 **Gestión de Productos** - CRUD completo de productos electrónicos
- 🏷️ **Categorías** - Organización por categorías
- 🏢 **Proveedores** - Gestión de proveedores
- 🏭 **Almacenes** - Control de ubicaciones de almacenamiento
- 📊 **Movimientos de Inventario** - Registro de entradas y salidas
- 🔒 **Rutas Protegidas** - Todas las operaciones requieren autenticación (excepto login/register)
- 🔑 **Encriptación de Contraseñas** - Uso de bcryptjs para seguridad

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Sequelize** - ORM para base de datos
- **MySQL** - Base de datos relacional
- **JWT** - Autenticación mediante tokens
- **bcryptjs** - Encriptación de contraseñas

## 📦 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/edissonparicahua123/SENATRONICS.git
cd SENATRONICS
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar la base de datos:**
   - Crea una base de datos MySQL llamada `senati-users`
   - Edita `src/settings/db.js` con tus credenciales

4. **Iniciar el servidor:**
```bash
node index.js
```

El servidor se ejecutará en `http://localhost:3000`

## ⚙️ Configuración

### Base de Datos (`src/settings/db.js`)
```javascript
const sequelize = new Sequelize("senati-users", "root", "TU_PASSWORD", {
  host: "localhost",
  dialect: "mysql"
});
```

### Secret Key JWT (`src/controllers/auth.controller.js`)
⚠️ **Importante:** En producción, usa variables de entorno para el SECRET_KEY

## 🚀 Uso

### 1. Registro de Usuario
```bash
POST http://localhost:3000/api/usuarios/register
Content-Type: application/json

{
  "nombre": "Usuario Test",
  "email": "test@example.com",
  "password": "123456",
  "rol": "admin"
}
```

### 2. Login
```bash
POST http://localhost:3000/api/usuarios/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Usar el Token

Para todas las peticiones protegidas, incluye el token en el header:
```
Authorization: Bearer TU_TOKEN_AQUI
```

## 📁 Estructura del Proyecto

```
SENATRONICS/
├── src/
│   ├── controllers/          # Lógica de negocio
│   │   ├── auth.controller.js
│   │   ├── producto.controller.js
│   │   ├── categoria.controller.js
│   │   ├── proveedor.controller.js
│   │   ├── almacen.controller.js
│   │   └── movimiento.controller.js
│   ├── models/               # Modelos de datos
│   │   ├── Usuario.js
│   │   ├── Producto.js
│   │   ├── Categoria.js
│   │   ├── Proveedor.js
│   │   ├── Almacen.js
│   │   └── MovimientoInventario.js
│   ├── routes/               # Rutas de la API
│   │   ├── usuario.routes.js
│   │   ├── producto.routes.js
│   │   ├── categoria.routes.js
│   │   ├── proveedor.routes.js
│   │   ├── almacen.routes.js
│   │   └── movimiento.routes.js
│   ├── middlewares/          # Middlewares
│   │   └── auth.middleware.js
│   ├── settings/             # Configuración
│   │   └── db.js
│   └── app.js                # Configuración de Express
├── index.js                  # Punto de entrada
├── test-auth.js              # Script de pruebas
└── package.json
```

## 🔌 Endpoints de la API

### Autenticación (Públicos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/usuarios/register` | Registrar usuario |
| POST | `/api/usuarios/login` | Iniciar sesión |

### Productos (Protegidos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Obtener producto |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

### Categorías (Protegidos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias` | Listar categorías |
| GET | `/api/categorias/:id` | Obtener categoría |
| POST | `/api/categorias` | Crear categoría |
| PUT | `/api/categorias/:id` | Actualizar categoría |
| DELETE | `/api/categorias/:id` | Eliminar categoría |

### Proveedores (Protegidos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/proveedores` | Listar proveedores |
| GET | `/api/proveedores/:id` | Obtener proveedor |
| POST | `/api/proveedores` | Crear proveedor |
| PUT | `/api/proveedores/:id` | Actualizar proveedor |
| DELETE | `/api/proveedores/:id` | Eliminar proveedor |

### Almacenes (Protegidos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/almacenes` | Listar almacenes |
| GET | `/api/almacenes/:id` | Obtener almacén |
| POST | `/api/almacenes` | Crear almacén |
| PUT | `/api/almacenes/:id` | Actualizar almacén |
| DELETE | `/api/almacenes/:id` | Eliminar almacén |

### Movimientos (Protegidos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/movimientos` | Listar movimientos |
| GET | `/api/movimientos/:id` | Obtener movimiento |
| POST | `/api/movimientos` | Crear movimiento |
| PUT | `/api/movimientos/:id` | Actualizar movimiento |
| DELETE | `/api/movimientos/:id` | Eliminar movimiento |

## 🔐 Autenticación JWT

### Flujo de Autenticación

1. **Registro/Login** → Obtener token JWT
2. **Incluir token** en header `Authorization: Bearer TOKEN`
3. **Middleware verifica** el token en cada petición
4. **Acceso permitido** si el token es válido

### Expiración del Token

- Los tokens expiran en **1 hora**
- Después de expirar, debes hacer login nuevamente

## 📝 Ejemplos de Uso

### Crear una Categoría
```bash
POST http://localhost:3000/api/categorias
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nombre": "Microcontroladores",
  "descripcion": "Placas y módulos programables"
}
```

### Crear un Producto
```bash
POST http://localhost:3000/api/productos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nombre": "Arduino Uno",
  "descripcion": "Microcontrolador ATmega328P",
  "precio": 25.50,
  "stock": 100,
  "id_categoria": 1,
  "id_proveedor": 1,
  "id_almacen": 1
}
```

## 🧪 Pruebas

### Script de Pruebas Automatizado
```bash
node test-auth.js
```

### Pruebas con Hoppscotch
Consulta la guía completa en `guia_completa_hoppscotch.md`

## 🔒 Seguridad

- ✅ Contraseñas encriptadas con bcryptjs (salt rounds: 10)
- ✅ Tokens JWT con expiración
- ✅ Rutas protegidas con middleware
- ✅ Validación de tokens en cada petición
- ⚠️ **Producción:** Usar variables de entorno para SECRET_KEY
- ⚠️ **Producción:** Implementar HTTPS
- ⚠️ **Producción:** Configurar CORS adecuadamente

## 📊 Modelo de Datos

### Relaciones
- **Producto** pertenece a **Categoría**
- **Producto** pertenece a **Proveedor**
- **Producto** pertenece a **Almacén**
- **MovimientoInventario** pertenece a **Producto**

## 🐛 Solución de Problemas

### Error: "Unknown column 'email' in 'field list'"
**Solución:** Reinicia el servidor con `sync({ alter: true })` para actualizar la base de datos.

### Error: "Token inválido"
**Solución:** El token expiró o es incorrecto. Haz login nuevamente.

### Error: "Acceso denegado. No hay token."
**Solución:** Incluye el header `Authorization: Bearer TOKEN` en tu petición.

## 👨‍💻 Autor

**Edisson Paricahua**
- GitHub: [@edissonparicahua123](https://github.com/edissonparicahua123)

## 📄 Licencia

ISC

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas, abre un [issue](https://github.com/edissonparicahua123/SENATRONICS/issues) en GitHub.

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!