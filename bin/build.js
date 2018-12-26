const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const dirPath = path.resolve(__dirname, "..");
const filePath = dirPath + "/package.json";
const dirList = fs.readdirSync(dirPath);
const workboxName = dirList.find(item => item.startsWith("workbox-v"));

if (!workboxName) {
  console.log(
    chalk.red("ERR: 未发现workbox文件，请重试: ") +
      chalk.yellow("npm run build")
  );
  return;
}
if (!dirList.find(item => item === "package.json")) {
  console.log(
    chalk.red("ERR: 未发现package.json文件，请重试: ") +
      chalk.yellow("npm init") +
      chalk.red(" 生成")
  );
  return;
}

const workboxVer = workboxName.replace(/[^0-9.]/gi, "");
const packageContent = fs.readFileSync(filePath, { encoding: "utf8" });
const packageObj = JSON.parse(packageContent);

packageObj.version = workboxVer;
fs.writeFileSync(filePath, JSON.stringify(packageObj, null, 2));
fs.renameSync(`${dirPath}/${workboxName}`, `${dirPath}/workbox`);

console.log(chalk.green("🎉 🎉 🎉 Success!!!"));
