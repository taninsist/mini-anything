#!/usr/bin/env node
const path = require("path");
const chokidar = require("chokidar");
const { spawn } = require("node:child_process");

const entryFile = process.argv[2];

if (!entryFile) {
  console.log("erorr not entry file");
  return;
}

const cwd = process.cwd();

const entry = path.resolve(cwd, entryFile);

const restartDebounce = debounce(restart, 5000);

let childProcess = null;
chokidar.watch([entry]).on("all", () => {
  console.log("mini-nodemon restart");
  restartDebounce();
});

function restart() {
  childProcess && childProcess.kill();
  childProcess = spawn("node", [entry], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
}

function debounce(fn, delay) {
  let id = null;
  return () => {
    clearTimeout(id);
    id = setTimeout(() => {
      fn();
    }, delay);
  };
}
