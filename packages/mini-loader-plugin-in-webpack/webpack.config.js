const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCleanWebpackPlugin = require("./plugins/miniCleanWebpackPlugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "[name].[hash:5].js",
    path: path.resolve(__dirname, "output"),
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
  devServer: {
    static: "./dist",
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCleanWebpackPlugin(),
  ],
};
