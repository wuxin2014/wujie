// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: "./",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    port: "7200",
  },
  transpileDependencies: [
    "sockjs-client",
  ],
  configureWebpack: {
    // 配置Webpack模块解析的方式，使得你可以通过模块名字而不是相对路径来引入模块
    resolve: {
      // 设置路径别名
      alias: {
        // 'element-ui': path.resolve(__dirname, '../node_modules/element-ui'),
      }
    }
  }
};
