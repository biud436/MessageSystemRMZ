const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
// const { CheckerPlugin } = require("awesome-typescript-loader");

const target = {
  mode: "production", // none' | 'development' | 'production'
  entry: path.join(__dirname, "src", "index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `RS_MessageSystem.js`,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".json"],
  },
  plugins: [
    // new CheckerPlugin(),
    new webpack.DefinePlugin({
      RS: "RS",
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
          const outputPath = path.resolve(__dirname, "dist");
          const outputFileName = "RS_MessageSystem.js";

          const topOfCommentAndLicense = fs.readFileSync(
            path.resolve(__dirname, "comments", "Comments.js"),
            "utf-8"
          );
          const content = fs.readFileSync(
            path.resolve(outputPath, outputFileName),
            "utf-8"
          );
          const output = `${topOfCommentAndLicense}${content}`;
          fs.writeFileSync(path.resolve(outputPath, outputFileName), output);
        });
      },
    },
  ],
  devtool: "source-map",
};

module.exports = [target];
