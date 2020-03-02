import axios from "axios";
//import router from "./../../../router";

const state = {
  allUsers: [],
  filteredUsers: []
};

const mutations = {
  GET_ALL_USERS(state, payload) {
    state.allUsers = payload;
  },
  GET_FILTERED_USERS(state, payload) {
    state.filteredUsers = [];
    state.filteredUsers = payload;
  },
  NO_USERS(state) {
    state.filteredUsers = [];
  }
};

const actions = {
  getAllUsers({ commit }) {
    axios.get("http://jsonplaceholder.typicode.com/users").then(response => {
      //console.log(response.data);
      commit("GET_ALL_USERS", response.data);
    });
  },
  getFilteredUsers({ commit, state }, filters) {
    console.log(filters.even);
    if (filters.even && filters.odd) {
      commit("GET_FILTERED_USERS", state.allUsers);
    } else if (filters.even === true && filters.odd === false) {
      const arrayEven = state.allUsers.filter(u => u.id % 2 === 0);
      commit("GET_FILTERED_USERS", arrayEven);
    } else if (filters.even === false && filters.odd === true) {
      const arrayOdd = state.allUsers.filter(u => u.id % 2 !== 0);
      commit("GET_FILTERED_USERS", arrayOdd);
    }
  },
  noUsers({ commit }) {
    commit("NO_USERS");
  }
};

const getters = {
  allUsers: state => state.allUsers,
  filteredUsers: state => state.filteredUsers
};

const userModule = {
  state,
  mutations,
  actions,
  getters
};

export default userModule;
