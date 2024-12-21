const {merge}= require("webpack-merge");
const commonConfig = require("./webpack.config")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(commonConfig,{
    mode:"development",
    optimiza
})