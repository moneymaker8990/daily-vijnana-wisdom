# Daily Vijnana Wisdom - Dev Server Launcher
Write-Host "Starting Daily Vijnana Wisdom App..." -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Starting Vite dev server..." -ForegroundColor Green
Write-Host "Once started, open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host ""

npx vite --host

Write-Host ""
Write-Host "Server stopped. Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")







