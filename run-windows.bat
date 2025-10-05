@echo off
setlocal ENABLEDELAYEDEXPANSION

rem Navigate to the script directory (project root)
cd /d "%~dp0"

echo === Bits & Clues: Windows Startup ===

rem 1) Sanity checks
if not exist package.json (
  echo Error: package.json not found in %cd%.
  echo Please run this script from the project folder.
  exit /b 1
)

node -v >nul 2>&1
if errorlevel 1 (
  echo Error: Node.js is not installed or not in PATH.
  echo Install LTS from https://nodejs.org/ and re-run this script.
  exit /b 1
)

rem 2) Detect package manager (prefer pnpm, then yarn, else npm)
set "PM="
where pnpm >nul 2>&1 && set "PM=pnpm"
if "%PM%"=="" (
  where yarn >nul 2>&1 && set "PM=yarn"
)
if "%PM%"=="" (
  where npm >nul 2>&1 && set "PM=npm"
)
if "%PM%"=="" (
  echo Error: No supported package manager found. Install pnpm, yarn, or npm.
  exit /b 1
)

echo === Using %PM% ===

rem 3) Install deps only if needed
set "NEED_INSTALL=1"
if exist node_modules (
  rem Basic check: if node_modules exists and contains react, assume installed
  if exist node_modules\react (
    set "NEED_INSTALL=0"
  )
)

if "%NEED_INSTALL%"=="1" (
  echo === Installing dependencies ===
  if /I "%PM%"=="pnpm" (
    pnpm -v >nul 2>&1 || (echo Error: pnpm not runnable.& exit /b 1)
    if exist pnpm-lock.yaml (
      call pnpm install --frozen-lockfile
    ) else (
      call pnpm install
    )
  ) else if /I "%PM%"=="yarn" (
    yarn -v >nul 2>&1 || (echo Error: yarn not runnable.& exit /b 1)
    if exist yarn.lock (
      call yarn install --frozen-lockfile
    ) else (
      call yarn install
    )
  ) else if /I "%PM%"=="npm" (
    npm -v >nul 2>&1 || (echo Error: npm not runnable.& exit /b 1)
    if exist package-lock.json (
      call npm ci
      if errorlevel 1 call npm install
    ) else (
      call npm install
    )
  )

  if errorlevel 1 (
    echo Error: Dependency installation failed.
    exit /b 1
  )
) else (
  echo === Dependencies already installed; skipping install ===
)

rem 4) Start dev server
echo === Starting dev server ===
if /I "%PM%"=="pnpm" (
  call pnpm dev
) else if /I "%PM%"=="yarn" (
  call yarn dev
) else if /I "%PM%"=="npm" (
  call npm run dev
)

endlocal

