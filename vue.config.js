const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/shared/variables.scss";
          @import "@/assets/scss/shared/mixins.scss";
          @import "@/assets/scss/shared/fonts.scss";
        `,
      },
    },
  },
});
