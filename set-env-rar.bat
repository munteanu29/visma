@echo off
for /f "delims=" %%A in (conf.vars) do set %%A
@echo on