import axios from "axios";
import router from "./../../../router";

const state = {
  authUser: {}
};

const mutations = {
  LOGIN(state, payload) {
    console.log(payload);
    state.authUser = payload;
  }
};

const actions = {
  login({ commit }, data) {
    axios.post("/api/login", data.postData).then(response => {
      if (response.data.status === "Ok") {
        commit("LOGIN", data.postData);
        window.localStorage.setItem("authUser", JSON.stringify(data.postData));
        router.push({ path: "/dashboard" });
      } else {
        return true;
      }
    });
  }
};

const getters = {
  authUser: state => state.authUser
};

const loginModule = {
  state,
  mutations,
  actions,
  getters
};

export default loginModule;
