@echo off

rem Change working path
cd %1

rem Write las file
echo %~2 > winmips64.las

rem Run winmips64
echo Running %2
winmips64