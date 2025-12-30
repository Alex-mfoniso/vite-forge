import path from "path";

export function validateProjectName(name) {
  if (!name) {
    console.error("Project name is required.");
    process.exit(1);
  }

  if (name.includes("..") || name.includes("/") || name.includes("\\")) {
    console.error("Invalid project name. Avoid using '..' or path separators.");
    process.exit(1);
  }

  // Check if it's a valid directory name
  const fullPath = path.resolve(process.cwd(), name);
  if (fullPath === process.cwd()) {
    console.error("Cannot create project in current directory.");
    process.exit(1);
  }

  return name;
}
