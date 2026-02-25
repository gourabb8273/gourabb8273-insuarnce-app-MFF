const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  mode: "development",
  devServer: { port: 3001, historyApiFallback: true },
  output: { publicPath: "auto", path: path.resolve(__dirname, "dist"), clean: true },
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "insuranceDetails",
      filename: "remoteEntry.js",
      exposes: {
        "./InsuranceDetailsApp": "./src/InsuranceDetailsApp.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyPlugin({ patterns: [{ from: "public/_headers", to: "." }] }),
  ],
};