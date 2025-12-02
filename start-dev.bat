@echo off
title Daily Vijnana Wisdom - Dev Server
color 0A

echo ============================================
echo   Daily Vijnana Wisdom App - Dev Server
echo ============================================
echo.

cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Checking Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Checking npm...
call npm --version
if errorlevel 1 (
    echo ERROR: npm is not working
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
call npm install

echo.
echo ============================================
echo   Starting Vite Development Server...
echo   Open http://localhost:5173 in browser
echo ============================================
echo.

call npx vite --host

echo.
echo Server stopped.
pause
