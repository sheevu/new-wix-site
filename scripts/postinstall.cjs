/* eslint-disable no-console */
const { spawnSync } = require("node:child_process");

// `wix sync-types` requires an interactive terminal for authentication.
// Skipping it keeps installs working in CI/non-TTY environments. Run it manually in a TTY.
const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);

if (!isInteractive) {
  console.log("[postinstall] Non-interactive terminal detected; skipping `wix sync-types`.");
  process.exit(0);
}

const result = spawnSync("npx", ["wix", "sync-types"], { stdio: "inherit" });
process.exit(result.status ?? 1);

