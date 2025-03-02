const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: "warning",
  devServer: {
    port: 3000,
  },
  transpileDependencies: true,
});
