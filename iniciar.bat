@echo off
echo ========================================
echo   Trabajadores App - Inicio Rapido
echo ========================================
echo.

echo [1/3] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado!
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js encontrado!
echo.

echo [2/3] Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias... Esto puede tardar varios minutos.
    call npm run install-all
    if errorlevel 1 (
        echo ERROR: Fallo la instalacion de dependencias
        pause
        exit /b 1
    )
) else (
    echo Dependencias ya instaladas.
)
echo.

echo [3/3] Iniciando aplicacion (solo frontend - prototipo)...
echo.
echo Frontend: http://localhost:3000
echo.
echo NOTA: Esta es una version prototipo que funciona sin backend.
echo Todos los datos se guardan en localStorage del navegador.
echo.
echo Presiona Ctrl+C para detener la aplicacion
echo.

call npm start

