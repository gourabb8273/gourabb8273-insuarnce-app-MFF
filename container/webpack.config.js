const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

const isProd = process.env.NODE_ENV === "production";
const insuranceDetailsUrl =
  process.env.REMOTE_INSURANCE_DETAILS_URL || "http://localhost:3001";
const premiumPaymentUrl =
  process.env.REMOTE_PREMIUM_PAYMENT_URL || "http://localhost:3002";

module.exports = {
  entry: "./src/index.jsx",
  mode: isProd ? "production" : "development",
  devServer: { port: 3000, historyApiFallback: true },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        insuranceDetails: `insuranceDetails@${insuranceDetailsUrl}/remoteEntry.js`,
        premiumPayment: `premiumPayment@${premiumPaymentUrl}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};