import Vue from "vue";
import Vuex from "vuex";

import Login from "./modules/login";
import User from "./modules/user";
import Interview from "./modules/interview";
/*import Cart from "./modules/cart";*/

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Login,
    User,
    Interview
  }
});
