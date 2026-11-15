@echo off
title SPACEVERSE Galactic Academy Server
color 0B

echo ======================================================
echo    🚀 SPACEVERSE GALACTIC ACADEMY SERVER LAUNCHER
echo ======================================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js detected! Launching SpaceVerse Node.js backend...
    echo.
    node backend\server.js
    goto :end
)

:: Check for Python
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python detected! Launching SpaceVerse Python backend...
    echo.
    python backend\app.py
    goto :end
)

:: Check for py launcher
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python launcher detected! Launching SpaceVerse Python backend...
    echo.
    py backend\app.py
    goto :end
)

echo [!] Notice: Neither Node.js nor Python was detected in your system PATH.
echo.
echo     Option A (No Installation Needed):
echo     Double-click 'index.html' to play SpaceVerse directly in your web browser!
echo.
echo     Option B (To Run Backend Server):
echo     1. Download and install Node.js from: https://nodejs.org/
echo     2. Re-run this launcher: run-server.bat
echo.
pause

:end
