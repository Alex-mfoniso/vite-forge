import fs from "fs";
import path from "path";

export function writeFileSafe(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`Overwriting ${filePath.replace(process.cwd(), ".")}`);
  }
  fs.writeFileSync(filePath, content, "utf8");
}
