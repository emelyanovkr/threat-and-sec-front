const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: "warning",
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
});
