

# Vite-Forge ⚡

Generate a React + Tailwind + Vite project in seconds — **one command, zero config.**

Vite-Forge is a lightweight CLI that bootstraps a fully-configured **React + Tailwind + Vite** starter instantly. No manual setup, no boilerplate cleanup, no Tailwind config headaches. Just run, open editor, start building.



## 🔥 What It Does

* Creates a clean **Vite + React** project
* Installs and configures:

  * `react`, `react-dom`
  * `tailwindcss`
  * `@tailwindcss/vite`
* Auto-generates project structure:

  * Tailwind-ready `vite.config.js`
  * `src/index.css` with Tailwind imports
  * `src/App.jsx` (customizable template text)
* Removes default Vite boilerplate
* Zero setup — **ready to dev immediately**

---

## 📦 Install

```bash
npm install -g vite-forge
```

---

## 🚀 Create a Project

```bash
vite-forge myproject
```

Create a project with a custom message inside `App.jsx`:

```bash
vite-forge myproject "Hello world, this is Alex!"
```

Important:
During project creation, Vite may ask a few questions. Click No for these:

“Use rollup-vite (Experimental)?” → select No

“Install with npm and start now?” → select No (Vite-Forge handles dependencies and setup automatically)

This ensures the project is created cleanly and ready for Vite-Forge to configure Tailwind and React.



Start development:

```bash
cd myproject
npm run dev
```

---

## 🛠 How It Works

Behind the scenes, Vite-Forge:

1. Runs `npm create vite@latest <projectName>`
2. Installs React + Tailwind dependencies
3. Injects Tailwind plugin into `vite.config.js`
4. Generates Tailwind starter `index.css`
5. Cleans default boilerplate
6. Writes a fresh `App.jsx` using your custom message

---

## 📌 Arguments

| Argument      | Description                              |
| ------------- | ---------------------------------------- |
| `projectName` | Name of your new project folder          |
| `customText`  | Optional message that appears in App.jsx |

Example:

```bash
vite-forge portfolio "Welcome to my Portfolio 🚀"
```

---

## 🧩 Requirements

* Node.js 16+
* npm

---

## 🪨 Error Handling

If installation/config fails, Vite-Forge logs the error clearly and exits gracefully — no silent failures.

---

## 📄 License

MIT License
