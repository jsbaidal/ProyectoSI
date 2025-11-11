# 🎨 Prototipo Frontend - Trabajadores App

## ✅ Estado: Funcional sin Backend

Esta aplicación ahora funciona **completamente en el frontend** sin necesidad de backend, MongoDB, o servicios externos. Todo está simulado con datos mock que se guardan en `localStorage`.

## 🚀 Cómo Ejecutar

### Opción 1: Script Simple
```bash
npm run install-frontend
npm start
```

### Opción 2: Manual
```bash
cd frontend
npm install
npm start
```

La aplicación se abrirá en: **http://localhost:3000**

## 📋 Características del Prototipo

### ✅ Funcionalidades Implementadas

1. **Autenticación**
   - Registro de usuarios (Cliente/Trabajador)
   - Inicio de sesión
   - Sesión persistente (localStorage)

2. **Búsqueda de Trabajadores**
   - Filtros por oficio, ciudad, estado, calificación, precio
   - 3 trabajadores de ejemplo precargados
   - Búsqueda en tiempo real

3. **Perfiles**
   - Perfil de trabajador completo
   - Edición de perfil
   - Certificaciones y experiencia

4. **Servicios**
   - Solicitud de servicios
   - Gestión de estado (pendiente, aceptado, en progreso, completado)
   - Panel de trabajador

5. **Chat**
   - Lista de chats
   - Envío de mensajes
   - Historial de conversaciones

6. **Datos Persistentes**
   - Todo se guarda en `localStorage`
   - Los datos persisten entre sesiones
   - Trabajadores de ejemplo precargados

## 🎯 Datos de Ejemplo

La aplicación viene con **3 trabajadores de ejemplo** precargados:

1. **Juan Pérez** - Plomero/Electricista (CDMX)
2. **María González** - Carpintera/Pintora (Guadalajara)
3. **Carlos Rodríguez** - Albañil/Constructor (Monterrey)

## 🧪 Prueba Rápida

1. **Registrarse como Cliente:**
   - Email: `cliente@test.com`
   - Contraseña: `123456`
   - Rol: Cliente

2. **Buscar Trabajadores:**
   - Ve a "Buscar Trabajadores"
   - Verás los 3 trabajadores de ejemplo
   - Puedes filtrar por oficio, ciudad, etc.

3. **Solicitar Servicio:**
   - Haz clic en "Ver Perfil" de un trabajador
   - Haz clic en "Solicitar Servicio"
   - Completa el formulario

4. **Registrarse como Trabajador:**
   - Cierra sesión
   - Regístrate como Trabajador
   - Ve a "Perfil" → "Editar Perfil"
   - Completa tu información

5. **Gestionar Servicios:**
   - Como trabajador, ve a "Mi Panel"
   - Verás las solicitudes de servicios
   - Puedes aceptar, iniciar y completar servicios

## 💾 Almacenamiento

Todos los datos se guardan en `localStorage` del navegador:
- `mock_users` - Usuarios registrados
- `mock_workers` - Perfiles de trabajadores
- `mock_services` - Servicios solicitados
- `mock_chats` - Chats creados
- `mock_messages` - Mensajes enviados
- `token` - Token de autenticación
- `userId` - ID del usuario actual

## 🔄 Limpiar Datos

Para resetear la aplicación, abre la consola del navegador y ejecuta:
```javascript
localStorage.clear();
location.reload();
```

## 📝 Notas Importantes

- **No hay backend real**: Todo funciona en el frontend
- **Datos locales**: Se guardan en el navegador
- **Sin pagos reales**: Los pagos están simulados
- **Sin Socket.IO real**: El chat funciona pero no es en tiempo real entre usuarios
- **Sin validación de servidor**: Las validaciones son solo del lado del cliente

## 🎨 Personalización

Puedes modificar los trabajadores de ejemplo en:
`frontend/src/services/mockData.ts`

## 🐛 Solución de Problemas

### La aplicación no carga
- Verifica que Node.js esté instalado
- Ejecuta `npm install` en la carpeta frontend
- Limpia la caché: `npm start -- --reset-cache`

### No veo trabajadores
- Los trabajadores de ejemplo están precargados
- Si no aparecen, limpia localStorage y recarga

### Error al iniciar sesión
- Asegúrate de haber registrado un usuario primero
- Verifica que el email y contraseña sean correctos

## 🚀 Próximos Pasos (Opcional)

Si más adelante quieres conectar un backend real:
1. Restaura las llamadas a `axios` en lugar de `mockApi`
2. Configura el backend
3. Actualiza las URLs de la API

Pero por ahora, **¡el prototipo funciona perfectamente sin backend!** 🎉

