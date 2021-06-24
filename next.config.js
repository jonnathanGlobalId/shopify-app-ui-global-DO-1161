const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
console.log("Configuraciones next", process.env.SHOPIFY_API_KEY);
const apiKey = JSON.stringify("4ba5dbb7ed2ea5b468762c7bf776c798");

module.exports = {
  webpack: (config) => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};
