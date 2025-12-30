import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runCommand } from "./utils/runCommand.js";
import { validateProjectName } from "./utils/validateName.js";
import { writeFileSafe } from "./utils/writeFileSafe.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readTemplate(templatePath, ts) {
  const content = fs.readFileSync(templatePath, "utf8");
  return ts ? content.replace(/\.jsx/g, ".tsx") : content;
}

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

    const packageJsonPath = path.join(target, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const devDepsToInstall = [];

    if (!deps.tailwindcss) devDepsToInstall.push("tailwindcss");
    if (!deps["@tailwindcss/vite"]) devDepsToInstall.push("@tailwindcss/vite");
    if (!deps.autoprefixer) devDepsToInstall.push("autoprefixer");

    if (devDepsToInstall.length > 0) {
      console.log("Installing Tailwind dependencies...");
      await runCommand("npm", ["install", "-D", ...devDepsToInstall], {
        cwd: target,
      });
    }

    if (!packageJson.dependencies?.["react-router-dom"]) {
      console.log("Installing React Router...");
      await runCommand("npm", ["install", "react-router-dom"], { cwd: target });
    }

    const eslintDeps = ["eslint", "@eslint/js"];

    if (ts) {
      eslintDeps.push(
        "@typescript-eslint/parser",
        "@typescript-eslint/eslint-plugin"
      );
    }

    console.log("Installing ESLint...");
    await runCommand("npm", ["install", "-D", ...eslintDeps], { cwd: target });

    console.log("Writing config files...");

    writeFileSafe(
      path.join(target, "vite.config.js"),
      `import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()]
})
`
    );

    writeFileSafe(
      path.join(target, "tailwind.config.js"),
      `export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: []
}
`
    );

    writeFileSafe(
      path.join(target, "postcss.config.js"),
      `export default {
  plugins: {
    autoprefixer: {}
  }
}
`
    );

    writeFileSafe(
      path.join(target, "eslint.config.js"),
      ts
        ? `import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import parser from "@typescript-eslint/parser"

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
]
`
        : `import js from "@eslint/js"

export default [
  js.configs.recommended
]
`
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
    writeFileSafe(path.join(srcDir, "index.css"), '@import "tailwindcss";');

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
    writeFileSafe(
      path.join(srcDir, `main${ts ? ".tsx" : ".jsx"}`),
      mainContent
    );

    // Generate template-specific content
    if (template === "basic") {
      // App.tsx
      const appContent = readTemplate(
        path.join(__dirname, "templates", "basic", "App.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `App${ts ? ".tsx" : ".jsx"}`),
        appContent
      );

      // Home page
      const homeContent = readTemplate(
        path.join(__dirname, "templates", "basic", "Home.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `pages/Home${ts ? ".tsx" : ".jsx"}`),
        homeContent
      );
    } else if (template === "dashboard") {
      // App.tsx with navigation
      const appContent = readTemplate(
        path.join(__dirname, "templates", "dashboard", "App.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `App${ts ? ".tsx" : ".jsx"}`),
        appContent
      );

      // Dashboard page
      const dashboardContent = readTemplate(
        path.join(__dirname, "templates", "dashboard", "Dashboard.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `pages/Dashboard${ts ? ".tsx" : ".jsx"}`),
        dashboardContent
      );

      // Sidebar component
      const sidebarContent = readTemplate(
        path.join(__dirname, "templates", "dashboard", "Sidebar.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/Sidebar${ts ? ".tsx" : ".jsx"}`),
        sidebarContent
      );

      // Header component
      const headerContent = readTemplate(
        path.join(__dirname, "templates", "dashboard", "Header.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/Header${ts ? ".tsx" : ".jsx"}`),
        headerContent
      );

      // StatCard component
      const statCardContent = readTemplate(
        path.join(__dirname, "templates", "dashboard", "StatCard.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/StatCard${ts ? ".tsx" : ".jsx"}`),
        statCardContent
      );

      // RecentActivity component
      const recentActivityContent = readTemplate(
        path.join(__dirname, "templates", "dashboard", "RecentActivity.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/RecentActivity${ts ? ".tsx" : ".jsx"}`),
        recentActivityContent
      );
    } else if (template === "landing") {
      // App.tsx
      const appContent = readTemplate(
        path.join(__dirname, "templates", "landing", "App.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `App${ts ? ".tsx" : ".jsx"}`),
        appContent
      );

      // Landing page
      const landingContent = readTemplate(
        path.join(__dirname, "templates", "landing", "Landing.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `pages/Landing${ts ? ".tsx" : ".jsx"}`),
        landingContent
      );

      // Hero component
      const heroContent = readTemplate(
        path.join(__dirname, "templates", "landing", "Hero.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/Hero${ts ? ".tsx" : ".jsx"}`),
        heroContent
      );

      // Features component
      const featuresContent = readTemplate(
        path.join(__dirname, "templates", "landing", "Features.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/Features${ts ? ".tsx" : ".jsx"}`),
        featuresContent
      );

      // About component
      const aboutContent = readTemplate(
        path.join(__dirname, "templates", "landing", "About.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/About${ts ? ".tsx" : ".jsx"}`),
        aboutContent
      );

      // Footer component
      const footerContent = readTemplate(
        path.join(__dirname, "templates", "landing", "Footer.js"),
        ts
      );
      writeFileSafe(
        path.join(srcDir, `components/Footer${ts ? ".tsx" : ".jsx"}`),
        footerContent
      );
    }

    // Update package.json
    packageJson.name = validatedName;
    packageJson.description = `A ${template} React app created with Vite Forge`;
    packageJson.scripts = {
      ...packageJson.scripts,
      lint: "eslint . --ext js,jsx,ts,tsx --report-unused-disable-directives --max-warnings 0",
    };
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      "utf8"
    );

    console.log("Project setup complete");
    console.log(`cd ${validatedName}`);
    console.log("npm run dev");
  } catch (err) {
    console.error("Build failed");
    console.error(err?.message || err);
    process.exit(1);
  }
}
