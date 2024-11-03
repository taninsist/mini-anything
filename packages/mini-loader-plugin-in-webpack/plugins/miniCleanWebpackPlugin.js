const PLUGIN_NAME = "MiniCleanWebpackPlugin";
const fs = require("fs");
const path = require("path");

/** @typedef import("webpack").Compiler Compiler */
/** @typedef {ReturnType<Compiler["getInfrastructureLogger"]>} Logger */

class MiniCleanWebpackPlugin {
  /**
   *
   * @param {Compiler} compiler
   */
  apply(compiler) {
    this.logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
    // 1. Plugins 加载时 缓存 输出目录
    this.outputPath = compiler.options.output.path;
    this.mode = compiler.options.mode;

    // 2. 注册 hook 执行程序
    compiler.hooks.initialize.tap(PLUGIN_NAME, () => {
      this.logger.info(PLUGIN_NAME, "start...");

      const path = this.outputPath;
      // 执行时删除输出目录

      deleteFolderRecursive(path);

      this.logger.info(PLUGIN_NAME, "end");
    });
  }
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // 递归删除文件夹
        deleteFolderRecursive(currentPath);
      } else {
        // 删除文件
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

module.exports = MiniCleanWebpackPlugin;
