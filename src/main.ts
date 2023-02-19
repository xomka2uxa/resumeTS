import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

import "./assets/scss/default.scss";
Vue.config.productionTip = false;

Vue.use(mdiVue, {
  icons: mdijs,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
