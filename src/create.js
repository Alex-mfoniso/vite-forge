#!/usr/bin/env node
import { execa } from "execa";
import fs from "fs";
import path from "path";

  export async function createProject() {
    try {
      const projectName = process.argv[2] || "myapp";
      const customText = process.argv[3] || "Welcome to my custom React + Tailwind app!";

      const target = path.join(process.cwd(), projectName);

      console.log("🔹 Creating project with Vite...");
      await execa("npm", ["create", "vite@latest", projectName], {
        stdio: "inherit",
        shell: true
      });

      if (!fs.existsSync(target)) {
        console.error("❌ Vite project folder not found. Aborting.");
        process.exit(1);
      }

      console.log("🔹 Installing React, React DOM, TailwindCSS...");
      try {
        await execa(
          "npm",
          [
            "install",
            "react",
            "react-dom",
            "-D",
            "tailwindcss",
            "@tailwindcss/vite"
          ],
          {
            cwd: target,
            stdio: "inherit",
            shell: true
          }
        );
        console.log("✅ Dependencies installed successfully");
      } catch (err) {
        console.error("❌ Installation of dependencies FAILED");
        console.error("----- ERROR START -----");
        console.error(err.stdout || err.stderr || err.message);
        console.error("----- ERROR END -----");
        process.exit(1);
      }

      // write vite.config.js
      const viteConfigContent = `import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";

  export default defineConfig({
    plugins: [react(), tailwindcss()],
  });
  `;
      fs.writeFileSync(path.join(target, "vite.config.js"), viteConfigContent, "utf8");
      console.log("🟢 vite.config.js updated with Tailwind plugin");

      // ensure src folder exists
      const srcDir = path.join(target, "src");
      if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

      // write index.css
      const indexCssPath = path.join(srcDir, "index.css");
      fs.writeFileSync(indexCssPath, '@import "tailwindcss";', "utf8");
      console.log("🟢 index.css updated with Tailwind import");

      // clear app.css if exists
      const appCssPath = path.join(srcDir, "app.css");
      if (fs.existsSync(appCssPath)) {
        fs.writeFileSync(appCssPath, "", "utf8");
        console.log("🟢 app.css cleared");
      }

      // overwrite App.jsx with custom content
      const appJsxPath = path.join(srcDir, "App.jsx");
      const customAppContent = `import React from "react";

  function App() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">
          ${customText}
        </h1>
      </div>
    );
  }

  export default App;
  `;
      fs.writeFileSync(appJsxPath, customAppContent, "utf8");
      console.log("🟢 App.jsx updated with custom content");

      console.log("\n🎉 Project setup complete!");
      console.log(`cd ${projectName}`);
      console.log("npm run dev to start your Vite + React + Tailwind project");

    } catch (err) {
      console.error("❌ Build failed:");
      console.error(err?.message || err);
      process.exit(1);
    }
  }

createProject();
