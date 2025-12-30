import { execa } from "execa";
import fs from "fs";
import path from "path";
import { runCommand } from "./utils/runCommand.js";
import { validateProjectName } from "./utils/validateName.js";

export async function createProject({ projectName, ts, template }) {
  try {
    const validatedName = validateProjectName(projectName);
    const target = path.join(process.cwd(), validatedName);

    console.log(
      `Creating ${ts ? "TypeScript" : "JavaScript"} project with Vite...`
    );

    const templateName = ts ? "react-ts" : "react";
    await runCommand("npm", [
      "create",
      "vite@latest",
      validatedName,
      "--",
      "--template",
      templateName,
    ]);

    if (!fs.existsSync(target)) {
      console.error("Vite project folder not found. Aborting.");
      process.exit(1);
    }

    console.log("Installing TailwindCSS...");
    await runCommand(
      "npm",
      ["install", "-D", "tailwindcss", "@tailwindcss/vite", "autoprefixer"],
      { cwd: target }
    );

    // Read package.json to check existing deps
    const packageJsonPath = path.join(target, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // Install react-router-dom if not present
    if (!packageJson.dependencies["react-router-dom"]) {
      console.log("Installing React Router...");
      await runCommand("npm", ["install", "react-router-dom"], { cwd: target });
    }

    // Install ESLint
    console.log("Installing ESLint...");
    await runCommand("npm", ["install", "-D", "eslint", "@eslint/js"], {
      cwd: target,
    });

    // Generate configs
    const viteConfigContent = `import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()]
})
`;
    fs.writeFileSync(
      path.join(target, "vite.config.js"),
      viteConfigContent,
      "utf8"
    );

    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
    fs.writeFileSync(
      path.join(target, "tailwind.config.js"),
      tailwindConfigContent,
      "utf8"
    );

    const postcssConfigContent = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
    fs.writeFileSync(
      path.join(target, "postcss.config.js"),
      postcssConfigContent,
      "utf8"
    );

    // ESLint config
    const eslintConfigContent = `import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
]
`;
    fs.writeFileSync(
      path.join(target, "eslint.config.js"),
      eslintConfigContent,
      "utf8"
    );

    // Set up src structure
    const srcDir = path.join(target, "src");
    if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

    // Create folders
    const folders = ["components", "pages", "hooks", "styles"];
    folders.forEach((folder) => {
      const folderPath = path.join(srcDir, folder);
      if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });
    });

    // Write index.css
    fs.writeFileSync(
      path.join(srcDir, "index.css"),
      '@import "tailwindcss";',
      "utf8"
    );

    // Write main.tsx
    const mainContent = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App${ts ? ".tsx" : ".jsx"}'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
`;
    fs.writeFileSync(
      path.join(srcDir, `main${ts ? ".tsx" : ".jsx"}`),
      mainContent,
      "utf8"
    );

    // Write App.tsx
    const appContent = `import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home${ts ? ".tsx" : ".jsx"}'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
`;
    fs.writeFileSync(
      path.join(srcDir, `App${ts ? ".tsx" : ".jsx"}`),
      appContent,
      "utf8"
    );

    // Write Home page
    const homeContent = `import React from 'react'

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to your new React app!
      </h1>
    </div>
  )
}

export default Home
`;
    fs.writeFileSync(
      path.join(srcDir, `pages/Home${ts ? ".tsx" : ".jsx"}`),
      homeContent,
      "utf8"
    );

    // Update package.json with name and scripts
    packageJson.name = validatedName;
    packageJson.description = "A React app created with Vite Forge";
    packageJson.scripts = {
      ...packageJson.scripts,
      lint: "eslint . --ext js,jsx,ts,tsx --report-unused-disable-directives --max-warnings 0",
    };
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      "utf8"
    );

    console.log("Project setup complete!");
    console.log(`cd ${validatedName}`);
    console.log("npm run dev");
  } catch (err) {
    console.error("Build failed:");
    console.error(err?.message || err);
    process.exit(1);
  }
}
