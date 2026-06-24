# 🏖️ BARBERÍA ELITE - FRONTEND

## ✨ Frontend Completado

Se ha creado un **frontend completamente responsivo y moderno** para la aplicación de barbería con:

### 📋 Páginas Creadas

#### 1. **index.html** - Página de Inicio
- Hero section con llamada a la acción
- Sección de características (6 cards)
- Barberos destacados dinámicos
- Sección de contacto
- CTA para reservar cita
- Footer completo

#### 2. **login.html** - Iniciar Sesión
- Formulario de login
- Validación de campos
- Mensajes de error
- Redirección automática
- Opción para registrarse

#### 3. **register.html** - Crear Cuenta
- Formulario de registro
- Validación de contraseñas coincidentes
- Confirmación exitosa
- Redirección a login
- Opción para iniciar sesión

#### 4. **barbers.html** - Nuestros Barberos
- Lista completa de barberos
- Información de horarios
- Botón directo para reservar
- Carga dinámica desde API
- Diseño en grid responsivo

#### 5. **booking.html** - Reservar Cita (4 PASOS)
```
PASO 1: Seleccionar Barbero
        ↓
PASO 2: Seleccionar Tipo de Corte
        ↓
PASO 3: Seleccionar Fecha y Hora (disponibilidad en tiempo real)
        ↓
PASO 4: Confirmar Cita
```
- Formulario multi-paso interactivo
- Validación en cada paso
- Carga de horarios disponibles
- Resumen de confirmación
- Envío seguro de reserva

#### 6. **dashboard.html** - Panel del Usuario
- Bienvenida personalizada
- Información de usuario
- (Preparado para mostrar historial de citas)
- Información de contacto del salón
- Enlaces de ayuda

### 🎨 Estilos y CSS

**archivo: `css/styles.css`** - 800+ líneas de CSS puro
- Variables de colores azules
- Diseño mobile-first responsivo
- Animaciones suaves (0.3s)
- Gradientes modernos
- Sombras sutiles
- Breakpoints: 768px (tablet), 480px (móvil)

**Características CSS:**
- ✅ Botones primarios y secundarios
- ✅ Cards con hover effect
- ✅ Grillas responsivas (2, 3, 4 columnas)
- ✅ Formularios con validación visual
- ✅ Alertas (éxito, error, advertencia, info)
- ✅ Modales
- ✅ Tablas
- ✅ Badges
- ✅ Navbar sticky
- ✅ Footer con secciones
- ✅ Spinner de carga
- ✅ Utilidades (m-1, mt-2, p-3, etc.)

### 🔧 JavaScript Modular

#### **api.js** - Servicio API
```javascript
class ApiService
  ├── register(nombre, email, password)
  ├── login(email, password)
  ├── getBarbers()
  ├── getHaircuts()
  ├── getAvailableSlots(barberoId, fecha, duracion)
  └── createAppointment(barberoId, tipoCorteId, inicioTime)
```

#### **auth.js** - Gestión de Autenticación
```javascript
class Auth
  ├── isAuthenticated()
  ├── getUser()
  ├── saveUser(user)
  ├── logout()
  ├── requireAuth()
  └── updateNavBar()
```

#### **app.js** - Utilidades UI
```javascript
class UI
  ├── showAlert(message, type, duration)
  ├── showError(fieldName, message)
  ├── openModal/closeModal()
  ├── formatDate/Time/DateTime()
  └── toggleMenu()

class FormValidator
  ├── validateEmail()
  ├── validatePassword()
  └── validateForm(fields)
```

### 🎯 Funcionalidades Principales

#### ✅ Autenticación
- Registro seguro con hash de contraseña
- Login con JWT token
- Persistencia en localStorage
- Verificación automática de sesión

#### ✅ Exploración
- Ver todos los barberos disponibles
- Ver tipos de cortes y duraciones
- Información de horarios

#### ✅ Reserva (Multi-paso)
- Selección interactiva de barbero
- Selección de tipo de corte
- Visualización de disponibilidad en TIEMPO REAL
- Confirmación visual antes de reservar

#### ✅ Experiencia de Usuario
- Validación en cliente
- Mensajes de error descriptivos
- Alertas de éxito
- Carga visual (spinners)
- Navegación intuitiva
- Menú móvil responsive

### 🎨 Colores y Diseño

**Paleta Azul Premium:**
```css
--primary-blue: #0066cc      /* Azul principal */
--secondary-blue: #0052a3    /* Azul secundario */
--light-blue: #e6f2ff        /* Azul claro (fondo) */
--dark-blue: #001f4d         /* Azul muy oscuro */
--accent-blue: #0099ff       /* Azul acento */
```

**Elementos de Diseño:**
- Gradientes azules en headers, heroes y footers
- Sombras sutiles con color azul
- Botones con efecto hover (traducción Y)
- Cards con efecto elevado
- Animaciones suave de 0.3s
- Iconos emoji para mejor UX

### 📱 Responsividad

```
Desktop (>768px)
├── Navbar normal con menú
├── Grillas de 3-4 columnas
└── Diseño full-width

Tablet (768px - 480px)
├── Navbar con menos espaciado
├── Grillas de 2 columnas
└── Márgenes ajustados

Móvil (<480px)
├── Menú hamburguesa
├── Grillas de 1 columna
├── Botones full-width
└── Fuentes más pequeñas
```

### 🚀 Cómo Usar

#### 1. Abrir en navegador
```bash
# Opción A: Abrir archivo directamente
firefox frontend/index.html

# Opción B: Usar Live Server (VS Code)
# Click derecho → Open with Live Server

# Opción C: Python server
cd frontend
python -m http.server 8000
# Ir a http://localhost:8000
```

#### 2. Flujo de usuario (primera vez)
- Ir a `index.html`
- Click en "Registrarse"
- Crear cuenta (nombre, email, contraseña)
- Login con credenciales
- Explorar "Barberos"
- Click en "Reservar Cita"
- Completar 4 pasos
- Confirmar reserva

#### 3. Credenciales de prueba
- Email: `test@example.com`
- Contraseña: `password123`

### 🔌 Conectividad con Backend

La aplicación se conecta automáticamente a:
```
http://localhost:3000/api
```

Endpoints consumidos:
- `POST /auth/register` - Registro
- `POST /auth/login` - Login
- `GET /barbers` - Lista de barberos
- `GET /haircuts` - Tipos de corte
- `GET /availability` - Horarios disponibles
- `POST /appointments` - Crear cita

### 📦 Estructura de Carpetas

```
frontend/
├── index.html              ← Página principal
├── login.html              ← Login
├── register.html           ← Registro
├── barbers.html            ← Lista de barberos
├── booking.html            ← Reservar cita (4 pasos)
├── dashboard.html          ← Panel de usuario
├── README.md               ← Documentación detallada
├── css/
│   └── styles.css          ← 800+ líneas de CSS moderno
├── js/
│   ├── api.js              ← Servicio API
│   ├── auth.js             ← Gestión de autenticación
│   └── app.js              ← Utilidades UI y validación
└── images/                 ← Carpeta para imágenes
```

### ✨ Características Destacadas

- ✅ **100% Responsive** - Funciona perfecto en móvil, tablet y desktop
- ✅ **Sin dependencias** - Solo HTML, CSS y JavaScript vanilla
- ✅ **Validación avanzada** - Campos con errores visuales
- ✅ **Animaciones fluidas** - Transiciones de 0.3s
- ✅ **Accesibilidad** - HTML semántico, contraste adecuado
- ✅ **Modern Design** - Gradientes, sombras, cards
- ✅ **Mobile-first** - Diseñado pensando en móviles primero
- ✅ **Seguridad** - JWT tokens, autenticación robusta

### 🎓 Documentación

Para más detalles, ver:
- [README.md](frontend/README.md) - Documentación completa del frontend

---

**¡Tu aplicación de barbería está lista para funcionar!** 🎉

Próximos pasos:
1. Asegúrate de que el servidor backend está corriendo (`npm run dev`)
2. Abre `frontend/index.html` en tu navegador
3. ¡Empieza a usar la aplicación!
