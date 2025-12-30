import { execa } from "execa";

export async function runCommand(command, args, options = {}) {
  try {
    await execa(command, args, { stdio: "inherit", shell: true, ...options });
  } catch (error) {
    console.error(`Command failed: ${command} ${args.join(" ")}`);
    console.error(error.stdout || error.stderr || error.message);
    process.exit(1);
  }
}
