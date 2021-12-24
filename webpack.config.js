const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const target = {
  mode: "production", // none' | 'development' | 'production'
  entry: `./RS_MessageSystem.ts`,
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
        include: [path.resolve(__dirname)],
      },
    ],
  },
  plugins: [
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
};

module.exports = [target];
