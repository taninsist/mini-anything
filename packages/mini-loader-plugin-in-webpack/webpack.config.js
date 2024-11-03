const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCleanWebpackPlugin = require("./plugins/miniCleanWebpackPlugin");
const MiniHtmlWebpackPlugin = require("./plugins/miniHtmlWebpackPlugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    // filename: "[name].[hash:5].js",
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue/,
        exclude: /node_modules/,
        use: [
          {
            loader: "vue-loader",
          },
          {
            loader: path.resolve(__dirname, "loaders", "toHiLoader.js"),
          },
        ],
      },
    ],
  },
  devServer: {},
  plugins: [
    new VueLoaderPlugin(),
    new MiniHtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "public", "index.html"),
    // }),
    new MiniCleanWebpackPlugin(),
  ],
};
