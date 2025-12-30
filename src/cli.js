#!/usr/bin/env node
import { createRequire } from "module";
import { createProject } from "./create.js";
import fs from "fs";
import path from "path";

const require = createRequire(import.meta.url);
const { version } = require("../../package.json");

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help")) {
    console.log(`
Vite Forge - Zero thinking React starter

Usage:
  npx vite-forge <project-name> [options]

Options:
  --ts          Use TypeScript (default)
  --js          Use JavaScript
  --template    Template: basic | dashboard | landing (default: basic)
  --help        Show this help
  --version, -v Show version

Examples:
  npx vite-forge myapp
  npx vite-forge myapp --js --template dashboard
`);
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log(version);
    process.exit(0);
  }

  const projectName = args[0];
  let ts = true;
  let template = "basic";

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--js") ts = false;
    else if (arg === "--ts") ts = true;
    else if (arg === "--template") {
      if (i + 1 < args.length) template = args[i + 1].toLowerCase();
      else {
        console.error("Missing template value after --template");
        process.exit(1);
      }
      i++;
    } else {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }
  }

  if (!["basic", "dashboard", "landing"].includes(template)) {
    console.error("Invalid template. Choose: basic, dashboard, landing");
    process.exit(1);
  }

  // Optional: warn if folder exists
  const target = path.join(process.cwd(), projectName);
  if (fs.existsSync(target)) {
    console.warn(
      `Warning: Folder "${projectName}" already exists. Files may be overwritten.`
    );
  }

  return { projectName, ts, template };
}

const options = parseArgs();
createProject(options);
