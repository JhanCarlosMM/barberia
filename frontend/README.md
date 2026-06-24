# Frontend - Barbería Elite 🏖️

Frontend responsivo y moderno para la aplicación de gestión de citas de barbería, construido con HTML5, CSS3 y JavaScript vanilla.

## 📁 Estructura de Archivos

```
frontend/
├── index.html              # Página de inicio/home
├── login.html              # Página de inicio de sesión
├── register.html           # Página de registro
├── barbers.html            # Listado de barberos
├── booking.html            # Reservar cita (flujo multi-paso)
├── dashboard.html          # Panel de usuario
├── css/
│   └── styles.css          # Estilos globales (móvil-first, responsivo)
├── js/
│   ├── api.js              # Servicio API (CRUD)
│   ├── auth.js             # Gestión de autenticación
│   └── app.js              # Utilidades y componentes UI
└── images/                 # Carpeta para imágenes
```

## 🎨 Diseño y Colores

- **Paleta de Colores:**
  - Azul Primario: `#0066cc`
  - Azul Secundario: `#0052a3`
  - Azul Oscuro: `#001f4d`
  - Azul Claro: `#e6f2ff`
  - Azul Acento: `#0099ff`

- **Características de Diseño:**
  - Gradientes modernos
  - Sombras sutiles
  - Animaciones suaves
  - Transiciones de 0.3s
  - Diseño responsivo móvil-first

## 📱 Características Responsivas

- **Desktop:** Grillas de 3-4 columnas
- **Tablet:** Grillas de 2 columnas
- **Móvil:** 1 columna, menú hamburguesa

Breakpoints:
- Tablet: 768px
- Móvil: 480px

## 🚀 Características Principales

### 1. **Autenticación**
- Registro de usuarios
- Inicio de sesión
- Gestión de tokens JWT
- Persistencia en localStorage
- Verificación de autenticación automática

### 2. **Explorar Barberos**
- Listado de todos los barberos
- Horarios de trabajo
- Acceso directo a reservar

### 3. **Sistema de Reservas (Multi-paso)**
- **Paso 1:** Seleccionar barbero
- **Paso 2:** Seleccionar tipo de corte
- **Paso 3:** Seleccionar fecha y hora (con disponibilidad en tiempo real)
- **Paso 4:** Confirmar reserva

### 4. **Panel de Usuario**
- Bienvenida personalizada
- Información de contacto del salón
- Próximas mejoras: historial de citas

### 5. **Componentes UI**
- Alertas (éxito, error, advertencia, info)
- Modales
- Formularios con validación
- Spinner de carga
- Badges
- Tablas
- Navegación responsive

## 🔌 Integración con API

La aplicación se conecta con la API REST en `http://localhost:3000/api`:

### Endpoints Utilizados

```javascript
POST   /auth/register          // Registrar usuario
POST   /auth/login             // Iniciar sesión
GET    /barbers                // Obtener lista de barberos
GET    /haircuts               // Obtener tipos de corte
GET    /availability           // Horarios disponibles
POST   /appointments           // Crear cita (requiere JWT)
```

## 💾 Almacenamiento Local

- **token:** Token JWT del usuario
- **user:** Datos del usuario autenticado (JSON)

## 🎯 Flujo de Usuario

### Usuario No Autenticado
```
Inicio → Barberos → Reservar (requiere login) → Login → Registrarse
```

### Usuario Autenticado
```
Inicio → Barberos → Reservar → Seleccionar Opciones → Confirmar → Dashboard
```

## 🔐 Seguridad

- Tokens JWT almacenados en localStorage
- Headers de autorización en solicitudes autenticadas
- Validación de formularios cliente-side
- Redirecciones automáticas para rutas protegidas

## 📦 Dependencias

**Ninguna!** Proyecto construido con:
- HTML5 nativo
- CSS3 puro
- JavaScript vanilla (ES6+)
- Fetch API para peticiones HTTP

## 🧪 Pruebas Locales

### 1. Abrir en el navegador
```bash
# Opción 1: Abrir directamente
firefox frontend/index.html

# Opción 2: Usar Live Server (VS Code)
# Extensión: Live Server

# Opción 3: Servidor local Python
cd frontend
python -m http.server 8000
# Luego ir a http://localhost:8000
```

### 2. Credenciales de prueba
- **Email:** test@example.com
- **Contraseña:** password123

### 3. Flujo de Prueba
1. Ir a inicio
2. Hacer clic en "Registrarse"
3. Crear nueva cuenta
4. Iniciar sesión
5. Ir a "Barberos"
6. Hacer clic en "Reservar"
7. Completar el flujo de 4 pasos

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:
```css
:root {
  --primary-blue: #tu-color;
  --secondary-blue: #tu-color;
  /* ... más colores */
}
```

### Cambiar Logo/Nombre
En cada `.html`, busca:
```html
<div class="logo">✂️ Barbería Elite</div>
```

### Cambiar URL de API
En `js/api.js`:
```javascript
const API_BASE_URL = 'http://tu-url:3000/api';
```

## 🐛 Solución de Problemas

### "Error al conectar con la API"
- Verifica que el servidor backend está corriendo en `http://localhost:3000`
- Comprueba la consola del navegador (F12 → Console)

### "No me muestra los barberos"
- Verifica que la base de datos tiene registros en la tabla `barberos`
- Comprueba la conexión del backend a MySQL

### CORS errors
- El backend debe tener CORS habilitado (ya configurado en `server.js`)
- Verifica que `Access-Control-Allow-Origin: *` está en los headers

## 📚 Documentación de Funciones

### API Service (`js/api.js`)
```javascript
api.register(nombre, email, password)
api.login(email, password)
api.getBarbers()
api.getHaircuts()
api.getAvailableSlots(barberoId, fecha, duracion)
api.createAppointment(barberoId, tipoCorteId, inicioTime)
```

### Auth Utilities (`js/auth.js`)
```javascript
Auth.isAuthenticated()        // Verifica si hay sesión
Auth.getUser()                // Obtiene datos del usuario
Auth.saveUser(user)           // Guarda datos del usuario
Auth.logout()                 // Cierra sesión
Auth.requireAuth()            // Redirige si no autenticado
Auth.updateNavBar()           // Actualiza navbar
```

### UI Utilities (`js/app.js`)
```javascript
UI.showAlert(message, type, duration)
UI.showError(fieldName, message)
UI.closeModal(modalId)
UI.openModal(modalId)
UI.formatDate(date)
UI.formatTime(time)
UI.formatDateTime(datetime)

FormValidator.validateEmail(email)
FormValidator.validatePassword(password)
FormValidator.validateForm(fields)
```

## 🚀 Deployment

### Opción 1: Servidor Static (Nginx/Apache)
```bash
# Copiar carpeta frontend a /var/www/html/
cp -r frontend /var/www/html/barberia
```

### Opción 2: GitHub Pages
```bash
# Crear repositorio en GitHub
# Subir carpeta frontend a gh-pages branch
```

### Opción 3: Netlify/Vercel
```bash
# Conectar repositorio
# Configurar build command: (dejar vacío)
# Configurar publish directory: frontend/
```

## 📞 Soporte

Para problemas o preguntas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs del servidor backend
3. Comprueba la conexión a internet

## 📄 Licencia

ISC - Libre para usar en tus proyectos
