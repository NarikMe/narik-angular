const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");
var execSync = require("child_process").execSync;

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

var SEPARATOR = process.platform === "win32" ? ";" : ":",
  env = Object.assign({}, process.env);

function myExecSync(cmd, path) {
  var output = execSync(cmd, {
    cwd: path,
    env: env
  });
}

const dirs = getDirectories("./dist/");

var root = process.cwd();

for (var dir of dirs) {
  console.log(dir);
  env.PATH = dir;
  myExecSync("npm publish  --access public", dir);
}
