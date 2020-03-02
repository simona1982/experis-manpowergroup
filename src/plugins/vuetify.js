import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loade
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi" || "mdiSvg" || "md" || "fa" || "fa4"
  }
});
