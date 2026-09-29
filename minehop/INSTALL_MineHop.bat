@echo off
setlocal
title MineHop Installer

echo.
echo  =========================================
echo        MineHop - CS Style Bhop
echo        Minecraft Bedrock v26.52
echo  =========================================
echo.
echo  Opening the MineHop .mcpack...
echo  Minecraft should import it automatically.
echo.

if not exist "%~dp0MineHop-CS-Style-Bhop-v1.0.1.mcpack" (
  echo ERROR: The .mcpack file is missing.
  echo Put this installer in the same folder as the .mcpack file.
  echo.
  pause
  exit /b 1
)

start "" "%~dp0MineHop-CS-Style-Bhop-v1.0.1.mcpack"

echo.
echo If Minecraft did not open, right-click the .mcpack file
echo and choose Open with Minecraft.
echo.
pause
