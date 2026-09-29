@echo off
setlocal
title MineHop Installer

echo.
echo =========================================
echo       MineHop - CS Style Bhop
echo =========================================
echo.
echo This installer will open the MineHop .mcpack.
echo Minecraft should import it automatically.
echo.

if not exist "%~dp0MineHop-CS-Style-Bhop-v1.0.1.mcpack" (
  echo ERROR: MineHop-CS-Style-Bhop-v1.0.1.mcpack was not found.
  echo.
  echo Make sure the .mcpack is in the same folder as this BAT file.
  echo.
  pause
  exit /b 1
)

start "" "%~dp0MineHop-CS-Style-Bhop-v1.0.1.mcpack"

echo.
echo Minecraft should now be importing MineHop.
echo If it does not open, right-click the .mcpack and choose Minecraft.
echo.
pause
