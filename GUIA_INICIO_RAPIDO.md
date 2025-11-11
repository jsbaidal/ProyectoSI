# 🚀 Guía de Inicio Rápido

## Paso 1: Verificar Node.js

Abre una terminal y verifica que tengas Node.js instalado:

```bash
node --version
npm --version
```

Si no tienes Node.js, descárgalo de: https://nodejs.org/

## Paso 2: Instalar MongoDB

### Opción A: MongoDB Local
1. Descarga MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Instálalo y asegúrate de que el servicio esté corriendo

### Opción B: MongoDB Atlas (Recomendado - Gratis)
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster gratuito
4. Obtén la cadena de conexión (connection string)
5. Reemplaza `<password>` con tu contraseña
6. Actualiza `MONGODB_URI` en `backend/.env`

## Paso 3: Instalar Dependencias

En la raíz del proyecto, ejecuta:

```bash
npm run install-all
```

Esto instalará las dependencias del proyecto raíz, backend y frontend.

**Nota:** Este proceso puede tardar varios minutos la primera vez.

## Paso 4: Configurar Variables de Entorno

El archivo `backend/.env` ya está creado con valores por defecto. Si usas MongoDB Atlas, actualiza la línea:

```
MONGODB_URI=tu_cadena_de_conexion_de_atlas
```

## Paso 5: Iniciar MongoDB (Solo si usas MongoDB local)

Si instalaste MongoDB localmente, asegúrate de que esté corriendo:

**Windows:**
- Busca "Services" en el menú de inicio
- Busca "MongoDB" y verifica que esté "Running"
- O ejecuta: `mongod` en una terminal

**Mac/Linux:**
```bash
sudo systemctl start mongod
# o
brew services start mongodb-community
```

## Paso 6: Ejecutar la Aplicación

En la raíz del proyecto, ejecuta:

```bash
npm run dev
```

Esto iniciará:
- Backend en: http://localhost:5000
- Frontend en: http://localhost:3000

**Nota:** La primera vez que ejecutes el frontend, puede tardar un poco en compilar.

## Paso 7: Probar la Aplicación

1. Abre tu navegador en: http://localhost:3000
2. Verás la página de inicio
3. Haz clic en "Registrarse"
4. Crea una cuenta como "Cliente"
5. Luego crea otra cuenta como "Trabajador" (en otra ventana o después de cerrar sesión)

## 🎯 Prueba Básica del Flujo

1. **Registrarse como Cliente:**
   - Email: cliente@test.com
   - Contraseña: 123456
   - Rol: Cliente

2. **Registrarse como Trabajador:**
   - Email: trabajador@test.com
   - Contraseña: 123456
   - Rol: Trabajador

3. **Como Trabajador:**
   - Ve a "Perfil"
   - Completa tu perfil de trabajador (oficios, experiencia, tarifa, etc.)

4. **Como Cliente:**
   - Ve a "Buscar Trabajadores"
   - Busca y selecciona un trabajador
   - Solicita un servicio

5. **Como Trabajador:**
   - Ve a "Mi Panel"
   - Acepta el servicio
   - Cambia el estado a "En progreso" y luego "Completado"

## ⚠️ Solución de Problemas

### Error: "Cannot find module"
```bash
# Elimina node_modules y reinstala
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all
```

### Error: "MongoDB connection failed"
- Verifica que MongoDB esté corriendo
- Verifica la URI en `backend/.env`
- Si usas Atlas, verifica que tu IP esté en la whitelist

### Error: "Port 5000 already in use"
- Cambia el puerto en `backend/.env` a otro (ej: 5001)
- Actualiza `CLIENT_URL` también

### Error: "Port 3000 already in use"
- El frontend te preguntará si quieres usar otro puerto
- O cambia el puerto en `frontend/package.json`

## 📝 Notas Importantes

- **Pagos:** Los pagos con Stripe no funcionarán sin claves reales. Para desarrollo, puedes omitir esta funcionalidad.
- **Chat:** El chat funciona en tiempo real. Asegúrate de que ambos usuarios estén conectados.
- **Base de datos:** Los datos se guardan en MongoDB. Si borras la base de datos, perderás toda la información.

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema, verifica:
1. Que todas las dependencias estén instaladas
2. Que MongoDB esté corriendo
3. Que los puertos 3000 y 5000 estén disponibles
4. Revisa la consola del navegador y la terminal para errores

