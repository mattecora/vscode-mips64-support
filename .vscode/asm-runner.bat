@echo off

rem Change working path
cd %1

rem Run asm
asm %2

rem Check correct execution
if %errorlevel% equ 0 (
    echo Program assembled correctly!

    rem Remove temporary files
    for /F "delims=" %%i in (%2) do (
        cd "%%~dpi"
        del *.cod
        del *.dat
    )
)