#!/usr/bin/env bash

set -euo pipefail

echo "==> Detecting package manager..."
if command -v pnpm >/dev/null 2>&1; then
  PM="pnpm"
  INSTALL_CMD="pnpm install --frozen-lockfile || pnpm install"
  RUN_DEV="pnpm dev"
elif command -v yarn >/dev/null 2>&1; then
  PM="yarn"
  INSTALL_CMD="yarn install --frozen-lockfile || yarn install"
  RUN_DEV="yarn dev"
elif command -v npm >/dev/null 2>&1; then
  PM="npm"
  INSTALL_CMD="npm ci || npm install"
  RUN_DEV="npm run dev"
else
  echo "Error: No supported package manager (pnpm, yarn, npm) found in PATH." >&2
  exit 1
fi

echo "==> Using $PM"
echo "==> Installing dependencies..."
sh -c "$INSTALL_CMD"

echo "==> Starting dev server..."
exec $RUN_DEV


