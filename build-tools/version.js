const fs = require("fs");
const version = "5.1.0";
const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const dirs = getDirectories("./projects/");
console.log(version);

for (var dir of dirs) {
  const packageJson = JSON.parse(
    fs.readFileSync(dir + "/package.json").toString()
  );
  console.log(dir + ":::" + packageJson.version);
  packageJson.version = version;
  fs.writeFileSync(dir + "/package.json", JSON.stringify(packageJson, null, 2));
}
