@echo off
setlocal ENABLEDELAYEDEXPANSION

echo === Detecting package manager ===
set "PM="
where pnpm >nul 2>&1
if not errorlevel 1 set "PM=pnpm"
if "%PM%"=="" (
  where yarn >nul 2>&1
  if not errorlevel 1 set "PM=yarn"
)
if "%PM%"=="" (
  where npm >nul 2>&1
  if not errorlevel 1 set "PM=npm"
)
if "%PM%"=="" (
  echo Error: No supported package manager ^(pnpm, yarn, npm^) found in PATH.
  exit /b 1
)

echo === Using %PM% ===
echo === Installing dependencies ===
call %PM% -v >nul 2>&1
if errorlevel 1 (
  echo Error: Failed to run %PM%.
  exit /b 1
)

rem Try frozen/ci first, then fall back
if /I "%PM%"=="npm" (
  call npm ci
  if errorlevel 1 (
    call npm install
  )
) else if /I "%PM%"=="yarn" (
  call yarn install --frozen-lockfile
  if errorlevel 1 (
    call yarn install
  )
) else if /I "%PM%"=="pnpm" (
  call pnpm install --frozen-lockfile
  if errorlevel 1 (
    call pnpm install
  )
)

if errorlevel 1 (
  echo Error: Dependency installation failed.
  exit /b 1
)

echo === Starting dev server ===
if /I "%PM%"=="npm" (
  call npm run dev
) else if /I "%PM%"=="yarn" (
  call yarn dev
) else if /I "%PM%"=="pnpm" (
  call pnpm dev
)

endlocal

