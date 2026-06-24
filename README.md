# 🏖️ Barbería API - Sistema de Gestión de Citas

Sistema REST API para gestión de reservas de barbería con autenticación JWT, disponibilidad de horarios y gestión de citas.

## ✨ Características

- ✅ Registro e inicio de sesión de usuarios
- ✅ Lista de barberos con horarios
- ✅ Tipos de cortes disponibles
- ✅ Consulta de horarios disponibles
- ✅ Reserva de citas
- ✅ Autenticación con JWT
- ✅ Validación de conflictos de citas

## 🛠️ Requisitos Previos

- Node.js v14+
- MySQL 5.7+
- npm o yarn

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd BARBERIA
```

### 2. Instalar dependencias
```bash
cd barberia-api
npm install
```

### 3. Configurar base de datos

#### Crear la base de datos
```bash
mysql -u root -p < ../database/setup.sql
```

#### O manualmente en MySQL:
```sql
mysql> CREATE DATABASE barberia;
mysql> USE barberia;
mysql> source database/setup.sql;
```

### 4. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con tus datos:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=barberia
JWT_SECRET=tu_clave_secreta_muy_segura
```

### 5. Ejecutar el servidor

**Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Endpoints de la API

### Autenticación

#### Registrar usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

**Respuesta:**
```json
{
  "message": "Usuario creado",
  "userId": 1
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### Barberos

#### Obtener lista de barberos
```http
GET /api/barbers
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "hora_inicio": "09:00:00",
    "hora_fin": "18:00:00"
  }
]
```

### Cortes

#### Obtener tipos de cortes
```http
GET /api/haircuts
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Corte Normal",
    "duracion_minutos": 30
  }
]
```

### Disponibilidad

#### Consultar horarios disponibles
```http
GET /api/availability?barbero_id=1&fecha=2024-01-20&duracion_minutos=30
```

**Parámetros:**
- `barbero_id` (requerido): ID del barbero
- `fecha` (requerido): Fecha en formato YYYY-MM-DD
- `duracion_minutos` (opcional): Duración del corte (default: 30)

**Respuesta:**
```json
{
  "fecha": "2024-01-20",
  "barbero_id": 1,
  "duracion": 30,
  "disponibles": ["09:00", "09:30", "10:00", "10:30"]
}
```

### Citas

#### Crear cita (requiere autenticación)
```http
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "barbero_id": 1,
  "tipo_corte_id": 1,
  "inicio_time": "2024-01-20T09:00:00"
}
```

**Respuesta:**
```json
{
  "message": "Cita guardada",
  "appointmentId": 5
}
```

## 🏗️ Estructura del Proyecto

```
BARBERIA/
├── barberia-api/              # Servidor Express
│   ├── server.js              # Punto de entrada
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   ├── middleware/
│   │   └── auth.js            # Middleware JWT
│   └── routes/
│       ├── auth.js
│       ├── barbers.js
│       ├── haircuts.js
│       ├── availability.js
│       └── appointments.js
├── controllers/               # Lógica de negocio
│   ├── authController.js
│   ├── barbersController.js
│   ├── haircutsController.js
│   ├── availabilityController.js
│   └── appointmentsController.js
├── database/                  # Configuración DB
│   ├── db_conect.js          # Pool de conexión
│   └── setup.sql             # Script de creación
└── ANALISIS_Y_CORRECCIONES.md # Documentación de cambios
```

## 🐛 Solución de Problemas

### Error: "ER_ACCESS_DENIED_FOR_USER"
- Verifica credenciales en `.env`
- Asegúrate de que MySQL está ejecutándose

### Error: "ECONNREFUSED"
- MySQL no está corriendo
- Verifica el puerto y host en `.env`

### Error de rutas 404
- Verifica que el servidor está en `http://localhost:3000`
- Comprueba que las dependencias están instaladas

## 📝 Notas de Desarrollo

- Todos los passwords se hashean con `bcrypt` (10 rounds)
- Los tokens JWT expiran en 24 horas
- Se valida automáticamente que no haya conflictos de citas
- Los índices de base de datos optimizan búsquedas de disponibilidad

## 🤝 Contribuir

Las pull requests son bienvenidas. Para cambios mayores, abre primero un issue.

## 📄 Licencia

ISC
