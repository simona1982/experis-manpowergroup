import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAd7Q-cTTXFwF-iCQR-WbTn9VQQNne7YMc",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;

// Global Guards
router.beforeEach((to, from, next) => {
  //console.log("ruta ", to);

  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("authUser"));

    if (authUser) {
      next();
    } else {
      next({ name: "login" });
    }
  }

  next();
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
