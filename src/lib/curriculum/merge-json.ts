import fs from "node:fs";
import path from "node:path";
import { loadAllTerms } from "./loaders";

const out = {
  year: 2026,
  ageGroup: "3–4 Year Group",
  terms: loadAllTerms()
};

fs.writeFileSync(path.resolve(process.cwd(), "data/curriculum-2026.json"), JSON.stringify(out, null, 2));
console.log("Merged → data/curriculum-2026.json");
