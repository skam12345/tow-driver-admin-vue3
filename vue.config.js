const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    // proxy: "https://bie.autogram.co.kr",
    // proxy: "http://192.168.0.5:5050",
  },
  // devServer: {
  //   allowedHosts: "all",
  // },
  transpileDependencies: true,
  lintOnSave: false,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
