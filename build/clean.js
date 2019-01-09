const rm = require("rimraf");
const path = require("path");
rm(path.resolve("app"), err => {
    if (err) throw err;
    console.log("删除app文件夹");
});
