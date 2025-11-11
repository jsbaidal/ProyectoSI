# 🚀 Guía de Despliegue - Trabajadores App

Esta guía te ayudará a desplegar tu aplicación prototipo para que otras personas puedan acceder a ella a través de un enlace.

## 📋 Opciones de Despliegue Gratuito

### Opción 1: Vercel (Recomendado) ⭐
**Ventajas:**
- ✅ Muy fácil de usar
- ✅ Despliegue automático desde GitHub
- ✅ HTTPS gratis
- ✅ Dominio personalizado
- ✅ Perfecto para React

### Opción 2: Netlify
**Ventajas:**
- ✅ Muy fácil de usar
- ✅ Despliegue automático
- ✅ HTTPS gratis
- ✅ Formularios y funciones serverless

### Opción 3: GitHub Pages
**Ventajas:**
- ✅ Gratis
- ✅ Integrado con GitHub
- ⚠️ Requiere configuración adicional

---

## 🎯 Opción 1: Desplegar en Vercel (RECOMENDADO)

### Paso 1: Preparar el Código

1. **Asegúrate de que tu código esté en GitHub:**
   ```bash
   # Si no tienes un repositorio Git, créalo:
   git init
   git add .
   git commit -m "Initial commit"
   
   # Crea un repositorio en GitHub y luego:
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   git push -u origin main
   ```

### Paso 2: Desplegar en Vercel

1. **Ve a [vercel.com](https://vercel.com)**
   - Crea una cuenta gratuita (puedes usar GitHub)

2. **Importa tu proyecto:**
   - Haz clic en "Add New" → "Project"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio de tu proyecto

3. **Configuración del proyecto:**
   - **Framework Preset:** Create React App (se detecta automáticamente)
   - **Root Directory:** `frontend` (¡IMPORTANTE!)
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `build` (automático)
   - **Install Command:** `npm install` (automático)
   
   ⚠️ **IMPORTANTE:** Asegúrate de cambiar el "Root Directory" a `frontend` en la configuración de Vercel

4. **Haz clic en "Deploy"**
   - Vercel construirá y desplegará tu aplicación automáticamente
   - Te dará una URL como: `tu-app.vercel.app`

5. **¡Listo!** 🎉
   - Tu aplicación estará disponible en la URL proporcionada
   - Cada vez que hagas push a GitHub, Vercel desplegará automáticamente

### Configuración Adicional (Opcional)

**Dominio personalizado:**
- Ve a "Settings" → "Domains"
- Agrega tu dominio personalizado

**Variables de entorno:**
- No necesitas ninguna para este prototipo (todo está en localStorage)

---

## 🎯 Opción 2: Desplegar en Netlify

### Paso 1: Preparar el Código

1. **Asegúrate de que tu código esté en GitHub** (igual que Vercel)

### Paso 2: Desplegar en Netlify

1. **Ve a [netlify.com](https://netlify.com)**
   - Crea una cuenta gratuita (puedes usar GitHub)

2. **Importa tu proyecto:**
   - Haz clic en "Add new site" → "Import an existing project"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio

3. **Configuración del build:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`

4. **Haz clic en "Deploy site"**
   - Netlify construirá y desplegará tu aplicación
   - Te dará una URL como: `tu-app.netlify.app`

5. **¡Listo!** 🎉
   - Tu aplicación estará disponible en la URL proporcionada

---

## 🎯 Opción 3: Desplegar en GitHub Pages

### Paso 1: Instalar gh-pages

```bash
cd frontend
npm install --save-dev gh-pages
```

### Paso 2: Actualizar package.json

Agrega estas líneas a `frontend/package.json`:

```json
{
  "homepage": "https://tu-usuario.github.io/tu-repositorio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Paso 3: Desplegar

```bash
npm run deploy
```

### Paso 4: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Guarda los cambios

---

## 🧪 Probar el Despliegue

Una vez desplegado, prueba:

1. **Accede a la URL proporcionada**
2. **Regístrate como cliente:**
   - Email: `cliente@test.com`
   - Contraseña: `123456`

3. **Busca trabajadores:**
   - Ve a "Buscar Trabajadores"
   - Deberías ver los 3 trabajadores de ejemplo

4. **Inicia sesión como trabajador:**
   - Email: `maria@example.com`
   - Contraseña: `123456`
   - Ve a "Mi Panel" para ver solicitudes

---

## 📝 Notas Importantes

### ⚠️ Datos en localStorage

- Los datos se guardan en el navegador de cada usuario
- Cada usuario tendrá su propia sesión y datos
- Los datos no se comparten entre usuarios
- Si el usuario limpia el cache, perderá los datos

### 🔒 Seguridad

- Este es un prototipo mockup
- No hay autenticación real
- No hay base de datos
- Perfecto para demostraciones y pruebas

### 🎨 Personalización

- Puedes cambiar el título en `frontend/public/index.html`
- Puedes cambiar los colores en `frontend/src/index.css`
- Puedes modificar los trabajadores de ejemplo en `frontend/src/services/mockData.ts`

---

## 🆘 Solución de Problemas

### Error: "Build failed"
- Verifica que todas las dependencias estén instaladas
- Revisa los logs de build en Vercel/Netlify
- Asegúrate de que el comando `npm run build` funcione localmente

### Error: "Page not found" al navegar
- Verifica que las rutas estén configuradas correctamente
- Asegúrate de que el archivo `vercel.json` o `netlify.toml` tenga las reglas de rewrite correctas

### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Ejecuta `npm install` localmente para verificar

---

## 🎉 ¡Listo para Compartir!

Una vez desplegado, puedes compartir el enlace con cualquiera:

- ✅ **Vercel:** `https://tu-app.vercel.app`
- ✅ **Netlify:** `https://tu-app.netlify.app`
- ✅ **GitHub Pages:** `https://tu-usuario.github.io/tu-repositorio`

### Credenciales para Compartir

Puedes compartir estas credenciales con los usuarios:

**Cliente de Prueba:**
- Email: `cliente@test.com`
- Contraseña: `123456`

**Trabajadores de Ejemplo:**
- María González: `maria@example.com` / `123456`
- Juan Pérez: `juan@example.com` / `123456`
- Carlos Rodríguez: `carlos@example.com` / `123456`

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas con el despliegue:
1. Revisa los logs de build en la plataforma
2. Verifica que el build funcione localmente: `cd frontend && npm run build`
3. Asegúrate de que todas las dependencias estén instaladas

¡Buena suerte con tu despliegue! 🚀

