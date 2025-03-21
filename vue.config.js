const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: "warning",
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true
      }
    }
  },
  transpileDependencies: true
});
