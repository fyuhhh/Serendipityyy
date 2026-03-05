@echo off
setlocal EnableDelayedExpansion
title Laporan Triset System (Cloudflare)
color 0D

:: ==========================================
:: 1. CLEANUP PREVIOUS SESSIONS
:: ==========================================
echo [1/6] Cleaning previous sessions...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM cloudflared.exe >nul 2>&1
taskkill /F /IM mysqld.exe >nul 2>&1
timeout /t 2 /nobreak >nul

:: ==========================================
:: 2. DATABASE REPAIR & START (Hidden)
:: ==========================================
echo [2/6] Starting Database (MySQL)...
if exist "C:\xampp\mysql\data\aria_log.*" (
    del /F /Q "C:\xampp\mysql\data\aria_log.*" >nul 2>&1
)
if exist "C:\xampp\mysql\bin\mysqld.exe" (
    wscript launcher.vbs "C:\xampp\mysql\bin\mysqld.exe"
    timeout /t 2 /nobreak >nul
)

:: ==========================================
:: 3. START BACKEND (Hidden)
:: ==========================================
echo [3/6] Launching Backend...
if exist "backend\server.js" (
    wscript launcher.vbs "cmd /c cd backend && node server.js"
)

:: ==========================================
:: 4. START FRONTEND (Hidden)
:: ==========================================
echo [4/6] Launching Frontend...
if exist "frontend" (
    wscript launcher.vbs "cmd /c cd frontend && npm run dev"
)

:: ==========================================
:: 5. START CLOUDFLARE TUNNEL (Hidden)
:: ==========================================
echo [5/6] Connecting to serendipityyy.site...
if exist "cloudflared.exe" (
    wscript launcher.vbs "cmd /c cloudflared.exe tunnel --config config.yml run"
)

:: ==========================================
:: 6. FINISH
:: ==========================================
echo [6/6] System is LIVE!
echo.
echo URL: https://serendipityyy.site
echo.
timeout /t 5 /nobreak >nul
start https://serendipityyy.site
exit
