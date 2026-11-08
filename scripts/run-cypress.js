delete process.env.ELECTRON_RUN_AS_NODE;
const { spawn } = require("child_process");
const path = require("path");

const cypressBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "cypress",
  "bin",
  "cypress"
);

const args = process.argv.slice(2);
const child = spawn(process.execPath, [cypressBin, ...args], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code || 0);
});

