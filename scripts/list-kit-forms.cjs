/**
 * Lists Kit (ConvertKit) v3 forms and IDs. Uses KIT_API_KEY from the environment
 * or from .env.local in the project root (never commit real keys).
 *
 * Usage:
 *   npm run kit:forms
 *   set KIT_API_KEY=... && npm run kit:forms   (Windows CMD)
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env.local");

if (fs.existsSync(envPath) && !process.env.KIT_API_KEY) {
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^KIT_API_KEY=(.*)$/);
    if (m) {
      process.env.KIT_API_KEY = m[1].trim().replace(/^["']|["']$/g, "");
      break;
    }
  }
}

const key = process.env.KIT_API_KEY;
if (!key) {
  console.error(
    "Missing KIT_API_KEY. Add it to .env.local or set the env var, then run again."
  );
  process.exit(1);
}

const url = `https://api.convertkit.com/v3/forms?api_key=${encodeURIComponent(key)}`;

(async () => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    console.error("Kit API error:", JSON.stringify(data, null, 2));
    process.exit(1);
  }
  const forms = data.forms || [];
  if (forms.length === 0) {
    console.log("No forms returned. Check your account.");
    return;
  }
  console.log("Use the numeric id as KIT_FORM_ID in Vercel.\n");
  console.log("id\tname");
  for (const f of forms) {
    console.log(`${f.id}\t${f.name}`);
  }
})();
