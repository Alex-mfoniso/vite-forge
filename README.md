# Vite Forge

Opinionated React starter using Vite, TypeScript, Tailwind, and React Router.

A zero-thinking starter for real projects. Decisions are made for you: TypeScript-first, router-ready, and opinionated from the first command.

## Documentation website

The project now includes a local documentation site in `docs/`.

Run it with:

```bash
npm run docs
```

Then open the URL printed in the terminal.

## What it does

- Creates a non-interactive Vite + React project
- Uses TypeScript by default, with `--js` available
- Installs and configures React, React DOM, Tailwind CSS, React Router, and ESLint
- Generates an opinionated folder structure
- Supports `basic`, `dashboard`, and `landing` templates

## Install

```bash
npm install -g vite-forge
```

Or use `npx`:

```bash
npx vite-forge my-app
```

## Usage

```bash
npx vite-forge <project-name> [options]
```

## Options

- `--ts` Use TypeScript, which is the default
- `--js` Use JavaScript
- `--template basic|dashboard|landing` Choose a starter template
- `--help` Show help
- `--version` or `-v` Show version

## Examples

```bash
npx vite-forge my-app
npx vite-forge my-app --js --template dashboard
npx vite-forge my-app --template landing
```

Then:

```bash
cd my-app
npm run dev
```

## Project structure

After generation, your project looks like:

```text
my-app/
+-- src/
|   +-- components/
|   +-- pages/
|   +-- hooks/
|   +-- styles/
|   +-- App.tsx
|   +-- main.tsx
|   +-- index.css
+-- vite.config.js
+-- tailwind.config.js
+-- postcss.config.js
+-- eslint.config.js
+-- package.json
```

## Templates

- `basic` gives you a minimal app shell
- `dashboard` gives you an admin-style layout
- `landing` gives you a marketing page starter

## What this is not

- A framework or full-stack solution
- A plugin system or marketplace
- A backend generator
- A UI component library

The point is speed and clarity, not endless setup.

## Contributing

PRs are welcome for bug fixes and template improvements.

## License

MIT
