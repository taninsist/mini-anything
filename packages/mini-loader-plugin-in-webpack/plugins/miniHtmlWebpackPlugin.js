const { dir } = require("node:console");
const fs = require("node:fs");
const path = require("node:path");

const PLUGIN_NAME = "MiniHtmlWebpackPlugin";

/** @typedef import("webpack").Compiler Compiler */
class MiniHtmlWebpackPlugin {
  constructor(options) {
    this.options = options || {};
    this.options.template = options.template || "./index.html";
  }
  /**
   *
   * @param {Compiler} compiler
   */
  apply(compiler) {
    this.outputPath = compiler.options.output.path;

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      const templatePath = this.options.template;
      const template = fs.readFileSync(templatePath, "utf8");

      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage:
            compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
          // additionalAssets: true,
        },
        (assets) => {
          const scripts = Object.keys(assets)
            .filter((asset) => {
              return asset.endsWith(".js");
            })
            .map((item) => {
              return `<script defer src='${item}'></script>`;
            })
            .join("\n");

          const lastHeadIndex = template.lastIndexOf("</head>");
          const startHTMl = template.substring(0, lastHeadIndex);
          const endHtml = template.substring(lastHeadIndex);
          const html = startHTMl + scripts + endHtml;

          this.writeHtml(this.outputPath, html);

          compilation.assets["index.html"] = {
            source: () => html,
            size: () => html.length,
          };
          return true;
        }
      );
    });
  }

  writeHtml(dirname, html) {
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
      fs.writeFileSync(path.resolve(dirname, "index.html"), html, "utf8");
    }
  }
}

module.exports = MiniHtmlWebpackPlugin;
