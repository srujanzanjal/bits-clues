@echo off
setlocal ENABLEDELAYEDEXPANSION

echo === Detecting package manager ===
where pnpm >nul 2>&1
if %ERRORLEVEL%==0 (
  set PM=pnpm
  set INSTALL_CMD=pnpm install --frozen-lockfile || pnpm install
  set RUN_DEV=pnpm dev
) else (
  where yarn >nul 2>&1
  if %ERRORLEVEL%==0 (
    set PM=yarn
    set INSTALL_CMD=yarn install --frozen-lockfile || yarn install
    set RUN_DEV=yarn dev
  ) else (
    where npm >nul 2>&1
    if %ERRORLEVEL%==0 (
      set PM=npm
      set INSTALL_CMD=npm ci || npm install
      set RUN_DEV=npm run dev
    ) else (
      echo Error: No supported package manager (pnpm, yarn, npm) found in PATH.
      exit /b 1
    )
  )
)

echo === Using %PM% ===
echo === Installing dependencies ===
call %PM% -v >nul 2>&1
if errorlevel 1 (
  echo Error: Failed to run %PM%.
  exit /b 1
)

rem Try ci/frozen first, then fall back
if /I "%PM%"=="npm" (
  call npm ci
  if errorlevel 1 call npm install
) else if /I "%PM%"=="yarn" (
  call yarn install --frozen-lockfile
  if errorlevel 1 call yarn install
) else if /I "%PM%"=="pnpm" (
  call pnpm install --frozen-lockfile
  if errorlevel 1 call pnpm install
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

