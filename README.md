# Vite Forge ⚡

Opinionated React starter using Vite, TypeScript, Tailwind, Router.

A zero-thinking React starter for real projects. Decisions are made for you — TypeScript-first, with routing and linting baked in.

## 🔥 What It Does

- Creates a **non-interactive** Vite + React project
- TypeScript by default (use `--js` for JavaScript)
- Installs and configures:
  - React, React DOM
  - TailwindCSS with PostCSS
  - React Router for routing
  - ESLint for code quality
- Generates opinionated structure:
  - `components/`, `pages/`, `hooks/`, `styles/` folders
  - Ready-to-edit `App.tsx/jsx` and pages
  - Proper Tailwind config and PostCSS setup
- Templates: `basic`, `dashboard`, `landing`
- Updates `package.json` with name, description, and scripts

## 📦 Install

```bash
npm install -g vite-forge
```

Or use npx:

```bash
npx vite-forge myapp
```

## 🚀 Usage

```bash
npx vite-forge <project-name> [options]
```

### Options

- `--ts` Use TypeScript (default)
- `--js` Use JavaScript
- `--template` Template: basic | dashboard | landing (default: basic)
- `--help` Show help
- `--version` Show version

### Examples

```bash
# Basic TypeScript project
npx vite-forge myapp

# JavaScript with dashboard template
npx vite-forge myapp --js --template dashboard

# TypeScript landing page
npx vite-forge myapp --template landing
```

Then:

```bash
cd myapp
npm run dev
```

## 📁 Project Structure

After generation, your project looks like:

```
myapp/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── package.json
```

## ⚠️ What This Does NOT Do

This is not:

- A framework or full-stack solution
- A plugin system or marketplace
- A backend generator
- A UI component library
- Customizable beyond templates

Opinions are baked in. Config is overwritten. It's for getting started fast, not endless tweaking.

## 🤝 Contributing

PRs welcome for bug fixes and template improvements. No feature creep.

## 📄 License

MIT
