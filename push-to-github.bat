@echo off
cd /d "%~dp0"

echo Cleaning up lock files...
del /f /q ".git\index.lock" 2>nul
del /f /q ".git\HEAD.lock" 2>nul

echo Removing old git folder...
rmdir /s /q .git 2>nul

echo.
echo Initializing fresh git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Committing...
git commit -m "Initial commit - Daily Vijnana Wisdom PWA"

echo.
echo Connecting to GitHub...
git remote add origin https://github.com/moneymaker8990/daily-vijnana-wisdom.git
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo ========================================
echo Done! You can close this window.
echo ========================================
pause
