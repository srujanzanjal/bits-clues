# Bits Clues

A small React + TypeScript + Vite app styled with Tailwind CSS.

## Prerequisites

- Node.js 18+ recommended
- One of: pnpm (preferred), yarn, or npm

## Quick Start

Mac/Linux:

```bash
./run-mac.sh
```

Windows:

```bat
run-windows.bat
```

These scripts detect your package manager, install deps (with frozen lockfile/ci when possible), and start the dev server.

## Manual Setup

Install dependencies:

```bash
# pick one
pnpm install
# or
yarn install
# or
npm install
```

Start dev server:

```bash
pnpm dev
# or yarn dev
# or npm run dev
```

Build for production:

```bash
pnpm build
# or yarn build
# or npm run build
```

Preview production build locally:

```bash
pnpm preview
# or yarn preview
# or npm run preview
```

## Project Structure

- `src/` — application source code
  - `components/` — UI components for stages
  - `hooks/` — custom hooks (e.g., configuration loader)
  - `types/` — shared TypeScript types
- `public/` — static assets served as-is
  - `config/config.json` — game configuration (riddles, quizzes, etc.)
- `run-mac.sh`, `run-windows.bat` — convenience scripts to run the app

## Configuration

Runtime configuration is loaded from `public/config/config.json`. Update this file to tweak riddles, passcodes, files, or quiz content without rebuilding the app.

## Scripts

Common scripts available in `package.json`:

- `dev` — start Vite dev server
- `build` — production build
- `preview` — preview built app
- `lint` — run ESLint
- `typecheck` — run TypeScript in no-emit mode

## License

MIT

## Repository

`https://github.com/srujanzanjal/bits-clues.git`


