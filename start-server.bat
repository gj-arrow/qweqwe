@echo off
title NADI Studio Server
cd /d "%~dp0"
echo ========================================
echo   NADI Studio - Local Server
echo ========================================
echo.
echo Server running at: http://localhost:8083
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.
python -m http.server 8083
pause
