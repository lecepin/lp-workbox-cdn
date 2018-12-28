const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
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

inquirer
  .prompt([
    {
      type: "input",
      name: "ver",
      message: "请输入WorkBox CDN的版本号",
      default: workboxVer,
      validate: value => {
        if (!value) {
          return "请输入版本号";
        }
        return true;
      }
    },
    {
      type: "list",
      name: "cdnUrl",
      message: "请选择生成的CDN地址",
      choices: ["aliCDN", "unpkgCDN"]
    }
  ])
  .then(result => {
    const ver = result.ver;
    const url =
      result.cdnUrl === "aliCDN"
        ? `https://g.alicdn.com/mylib/lp-workbox-cdn/${ver}/workbox`
        : `https://unpkg.com/lp-workbox-cdn@${ver}/workbox`;

    fs.readdirSync(`${dirPath}/workbox`)
      .filter(file => file.endsWith(".js"))
      .map(fileName => {
        const filePath = `${dirPath}/workbox/${fileName}`;
        const fileContent = fs.readFileSync(filePath, {
          encoding: "utf8"
        });
        const replaceContent = fileContent.replace(
          /https:\/\/storage\.googleapis\.com\/workbox-cdn\/releases\/[^\"]+/g,
          url
        );
        fs.writeFileSync(filePath, replaceContent);
      });

    console.log(chalk.green("🎉 🎉 🎉 Success!!!"));
  });
