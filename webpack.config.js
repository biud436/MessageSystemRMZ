const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const yaml = require("js-yaml");

function loadConfig() {
    try {
        const contents = fs.readFileSync(
            path.resolve(__dirname, "config.yml"),
            "utf8"
        );
        const doc = yaml.load(contents);
        return doc;
    } catch (e) {
        console.warn(e);
    }
}

/**
 * This function will be executed after the build is complete.
 */
function getAfterBuildOptions() {
    return {
        apply: (compiler) => {
            compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
                const outputPath = path.resolve(__dirname, "dist");
                // const outputFileName = "RS_MessageSystem.js";
                const config = loadConfig();
                const outputFileName = config.outputs.name;

                const topOfCommentAndLicense = fs.readFileSync(
                    path.resolve(__dirname, "comments", "Comments.js"),
                    "utf-8"
                );
                const content = fs.readFileSync(
                    path.resolve(outputPath, outputFileName),
                    "utf-8"
                );
                const output = `${topOfCommentAndLicense}${content}`;
                fs.writeFileSync(
                    path.resolve(outputPath, outputFileName),
                    output
                );
            });
        },
    };
}

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
        new webpack.DefinePlugin({
            RS: "RS",
        }),
        getAfterBuildOptions(),
    ],
    devtool: "source-map",
};

module.exports = [target];
