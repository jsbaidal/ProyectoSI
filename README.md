# Trabajadores App - Plataforma de Servicios

Aplicación tipo Uber para conectar clientes con trabajadores calificados de manera rápida y segura.

## 🚀 Características Principales

### 1. Búsqueda Inteligente de Oficios
- Búsqueda por oficio, ubicación, experiencia y calificación
- Filtros avanzados (precio, verificación, rating)
- Búsqueda por geolocalización con radio configurable

### 2. Perfiles Verificados con Reputación
- Información validada de cada trabajador
- Certificaciones y experiencia verificable
- Sistema de comentarios y puntuación promedio
- Verificación de documentos (ID, comprobante de domicilio, antecedentes)

### 3. Chat Integrado
- Comunicación directa y privada entre cliente y trabajador
- Mensajería en tiempo real con Socket.IO
- Notificaciones de nuevos mensajes

### 4. Sistema de Pago Electrónico Seguro
- Integración con Stripe
- Pagos protegidos mediante la app
- Opciones de tarjeta, transferencia o billeteras digitales

### 5. Sistema de Valoraciones Globales
- Calificación mutua (cliente-trabajador)
- Transparencia y mejora de reputación
- Reseñas verificadas solo para servicios completados

### 6. Registro de Perfil Laboral Profesional
- Perfil con foto, experiencia, tarifas
- Múltiples oficios por trabajador
- Portfolio de trabajos previos
- Disponibilidad por día de la semana

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- Cuenta de Stripe (para pagos)
- Cuenta de Cloudinary (opcional, para imágenes)

## 🛠️ Instalación

### 1. Clonar e instalar dependencias

```bash
# Instalar dependencias del proyecto raíz
npm install

# Instalar dependencias del backend y frontend
npm run install-all
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` en el backend y configura las variables:

```bash
cd backend
cp .env.example .env
```

Edita `backend/.env` con tus credenciales:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trabajadores-app
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta_stripe
STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_stripe

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 3. Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo:

```bash
# Si usas MongoDB local
mongod
```

O configura tu URI de MongoDB Atlas en el archivo `.env`.

### 4. Ejecutar la aplicación

```bash
# Ejecutar backend y frontend simultáneamente
npm run dev

# O ejecutar por separado:
# Backend
npm run server

# Frontend (en otra terminal)
npm run client
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Estructura del Proyecto

```
proyecto SI/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routes/          # Rutas de Express
│   │   ├── middleware/      # Middleware (auth, etc.)
│   │   ├── socket/          # Configuración Socket.IO
│   │   └── index.ts         # Punto de entrada
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── context/         # Context API (Auth, Socket)
│   │   ├── models/          # Tipos TypeScript
│   │   └── App.tsx
│   └── package.json
└── package.json
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Obtener usuario actual

### Trabajadores
- `GET /api/workers/search` - Búsqueda de trabajadores
- `GET /api/workers/:id` - Obtener perfil de trabajador
- `GET /api/workers/me` - Obtener mi perfil de trabajador
- `POST /api/workers` - Crear/actualizar perfil de trabajador

### Servicios
- `POST /api/services` - Crear solicitud de servicio
- `GET /api/services/me` - Obtener mis servicios (cliente)
- `GET /api/services/worker` - Obtener servicios del trabajador
- `GET /api/services/:id` - Obtener servicio por ID
- `PUT /api/services/:id/status` - Actualizar estado del servicio

### Reseñas
- `POST /api/reviews` - Crear reseña
- `GET /api/reviews/worker/:workerId` - Obtener reseñas de trabajador

### Pagos
- `POST /api/payments/create-intent` - Crear intención de pago
- `POST /api/payments/confirm` - Confirmar pago
- `POST /api/payments/webhook` - Webhook de Stripe

### Chat
- `GET /api/chat` - Obtener mis chats
- `POST /api/chat` - Crear/obtener chat
- `GET /api/chat/:chatId/messages` - Obtener mensajes del chat

## 🔐 Autenticación

La aplicación usa JWT (JSON Web Tokens) para autenticación. Incluye el token en el header:

```
Authorization: Bearer <token>
```

## 💳 Configuración de Pagos

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Obtén tus claves de API (modo test para desarrollo)
3. Configura las variables de entorno en `backend/.env`
4. Para producción, configura el webhook en el dashboard de Stripe

## 🧪 Pruebas

Para probar la aplicación:

1. Registra un usuario como "Cliente"
2. Registra otro usuario como "Trabajador"
3. Completa el perfil del trabajador
4. Como cliente, busca trabajadores
5. Solicita un servicio
6. Como trabajador, acepta el servicio
7. Completa el servicio y realiza el pago
8. Califica el servicio

## 🚧 Próximas Mejoras

- [ ] Integración con mapas (Google Maps/Mapbox) para geolocalización
- [ ] Subida de imágenes para portfolio
- [ ] Notificaciones push
- [ ] Sistema de reportes y moderación
- [ ] App móvil (React Native)
- [ ] Dashboard de administración
- [ ] Sistema de suscripciones para trabajadores

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

