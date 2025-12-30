import fs from "fs";
import path from "path";
import { runCommand } from "./utils/runCommand.js";
import { validateProjectName } from "./utils/validateName.js";
import { writeFileSafe } from "./utils/writeFileSafe.js";

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
    tailwindcss: {},
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
    const folders = ['components', 'pages', 'hooks', 'styles'];
    folders.forEach(folder => {
      const folderPath = path.join(srcDir, folder);
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    });

    // Write index.css
    writeFileSafe(path.join(srcDir, "index.css"), '@import "tailwindcss";');

    // Write main.tsx
    const mainContent = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App${ts ? '.tsx' : '.jsx'}'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
`;
    writeFileSafe(path.join(srcDir, `main${ts ? '.tsx' : '.jsx'}`), mainContent);

    // Generate template-specific content
    if (template === 'basic') {
      // App.tsx
      const appContent = `import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home${ts ? '.tsx' : '.jsx'}'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
`;
      writeFileSafe(path.join(srcDir, `App${ts ? '.tsx' : '.jsx'}`), appContent);

      // Home page
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
      writeFileSafe(path.join(srcDir, `pages/Home${ts ? '.tsx' : '.jsx'}`), homeContent);

    } else if (template === 'dashboard') {
      // App.tsx with navigation
      const appContent = `import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard${ts ? '.tsx' : '.jsx'}'
import Sidebar from './components/Sidebar${ts ? '.tsx' : '.jsx'}'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
`;
      writeFileSafe(path.join(srcDir, `App${ts ? '.tsx' : '.jsx'}`), appContent);

      // Dashboard page
      const dashboardContent = `import React from 'react'

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Card 1</h2>
          <p className="text-gray-600">Some content here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Card 2</h2>
          <p className="text-gray-600">Some content here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Card 3</h2>
          <p className="text-gray-600">Some content here</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
`;
      writeFileSafe(path.join(srcDir, `pages/Dashboard${ts ? '.tsx' : '.jsx'}`), dashboardContent);

      // Sidebar component
      const sidebarContent = `import React from 'react'

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <nav className="mt-8">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <a href="/">Dashboard</a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="/">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
`;
      writeFileSafe(path.join(srcDir, `components/Sidebar${ts ? '.tsx' : '.jsx'}`), sidebarContent);

    } else if (template === 'landing') {
      // App.tsx
      const appContent = `import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing${ts ? '.tsx' : '.jsx'}'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  )
}

export default App
`;
      writeFileSafe(path.join(srcDir, `App${ts ? '.tsx' : '.jsx'}`), appContent);

      // Landing page
      const landingContent = `import React from 'react'

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Your Brand</h1>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-800">Features</a>
            <a href="#about" className="text-gray-600 hover:text-gray-800">About</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Your Landing Page
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Build something amazing with React and Tailwind CSS.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
          Learn More
        </button>
      </main>
    </div>
  )
}

export default Landing
`;
      writeFileSafe(path.join(srcDir, `pages/Landing${ts ? '.tsx' : '.jsx'}`), landingContent);
    }

    // Update package.json
    packageJson.name = validatedName;
    packageJson.description = `A ${template} React app created with Vite Forge`;
    packageJson.scripts = {
      ...packageJson.scripts,
      lint: "eslint . --ext js,jsx,ts,tsx --report-unused-disable-directives --max-warnings 0",
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");

    console.log("Project setup complete");
    console.log(`cd ${validatedName}`);
    console.log("npm run dev");
  } catch (err) {
    console.error("Build failed");
    console.error(err?.message || err);
    process.exit(1);
  }
}
