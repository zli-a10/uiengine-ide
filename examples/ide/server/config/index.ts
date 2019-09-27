import webpack, { IgnorePlugin } from "webpack";

const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require("path");
// const fs = require("fs");

const pathRoot = path.join(__dirname, "../../");
const pathPublic = path.join(pathRoot, "dist");

const config: webpack.Configuration = {
  context: pathRoot,
  mode: "development",
  target: "node",
  entry: path.resolve(pathRoot, "index.ts"),
  output: {
    filename: "index.js",
    path: pathPublic
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [pathRoot],
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              context: pathRoot,
              transpileOnly: true
            }
          }
        ]
      },
      { test: /\.node$/, use: "node-loader" }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    alias: {
      server: pathRoot
    }
  },
  plugins: [new IgnorePlugin(/^aws-sdk$/), new NodemonPlugin()]
};

export default config;
