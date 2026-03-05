@echo off
title Serendipityyy Web Project Manager
color 0B

echo =================================================================
echo             [ SERENDIPITYYY PROJECT MANAGER ]
echo =================================================================
echo.
echo Pilih Aksi:
echo [1] Jalankan Semua Service (Hidden/Background)
echo [0] Matikan Semua Service yang Berjalan (Frontend, Backend, dll)
echo.
set /p choice="Masukkan pilihan (1 / 0): "

if "%choice%"=="1" goto start_services
if "%choice%"=="0" goto stop_services

echo Pilihan tidak valid. Keluar...
pause
exit

:stop_services
echo.
echo =================================================================
echo [WAIT] Mematikan semua service yang sedang berjalan...
echo =================================================================
echo.

echo [INFO] Mencari dan menghentikan proses di port 5173 (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo [INFO] Menghentikan node.exe, httpd.exe (Apache), mysqld.exe, dan cloudflared...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM httpd.exe >nul 2>&1
taskkill /F /IM mysqld.exe >nul 2>&1
taskkill /F /IM cloudflared.exe >nul 2>&1

timeout /t 2 /nobreak >nul
echo.
echo =================================================================
echo [OK]   SEMUA SERVICE BERHASIL DIMATIKAN!
echo =================================================================
echo.
pause
exit

:start_services
:: Bikin file helper VBS sementara untuk menjalankan proses secara benar-benar tersembunyi (Hidden/Background)
set "VBS_FILE=%~dp0hidden_run.vbs"
echo Set WshShell = CreateObject("WScript.Shell") > "%VBS_FILE%"
echo WshShell.Run WScript.Arguments(0), 0, False >> "%VBS_FILE%"

echo.
echo =================================================================
echo [WAIT] Menyiapkan dan Memulai Services...
echo =================================================================
echo.

echo [WAIT] 1. Cleanup Awal (Force Restart)...
echo [INFO] Mencari dan menghentikan sisa proses sebelumnya...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM httpd.exe >nul 2>&1
taskkill /F /IM mysqld.exe >nul 2>&1
taskkill /F /IM cloudflared.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK]   Cleanup Selesai.
echo.

echo [WAIT] 2. Perbaikan Otomatis MySQL (XAMPP)...
if exist "C:\xampp\mysql\data\aria_log.*" (
    echo [INFO] Menemukan file aria_log, menghapus...
    del /f /q "C:\xampp\mysql\data\aria_log.*" >nul 2>&1
    echo [OK]   File aria_log berhasil dihapus.
) else (
    echo [INFO] File aria_log sudah bersih.
)

echo [WAIT] Memulai Apache dan MySQL lewat XAMPP (HIDDEN)...
cscript //nologo "%VBS_FILE%" "C:\xampp\apache\bin\httpd.exe"
cscript //nologo "%VBS_FILE%" "C:\xampp\mysql\bin\mysqld.exe"

:: Beri jeda agar MySQL Database 'Up' sebelum backend terkoneksi
timeout /t 4 /nobreak >nul
echo [OK]   Apache ^& MySQL siap di background.
echo.

echo [WAIT] 3. Eksekusi Background (Benar-benar Hidden)...

echo [WAIT] Menjalankan Backend...
cscript //nologo "%VBS_FILE%" "cmd.exe /c cd /d ""%~dp0backend"" && node server.js"
timeout /t 3 /nobreak >nul
echo [OK]   Backend berjalan.

echo [WAIT] Menjalankan Frontend...
cscript //nologo "%VBS_FILE%" "cmd.exe /c cd /d ""%~dp0frontend"" && npm start"
timeout /t 3 /nobreak >nul
echo [OK]   Frontend berjalan.

echo [WAIT] Menjalankan Cloudflare Tunnel...
cscript //nologo "%VBS_FILE%" "cmd.exe /c cd /d ""%~dp0"" && .\cloudflared.exe tunnel --config config.yml run"
timeout /t 2 /nobreak >nul
echo [OK]   Tunnel berjalan.
echo.

echo [INFO] Membersihkan file temporary...
del /q "%VBS_FILE%" >nul 2>&1

echo =================================================================
echo             [OK] SEMUA SERVICE BERHASIL DIJALANKAN (HIDDEN)!
echo =================================================================
echo.

echo [WAIT] 5. Finalisasi - Membuka Browser...
start http://localhost:5173
echo [OK]   Browser terbuka di http://localhost:5173
echo.

echo [INFO] Log selesai dicetak. Semua service berjalan tanpa mengganggu layar (Hidden).
echo Tekan tombol apa saja untuk menutup jendela launcher ini...
pause >nul
exit
