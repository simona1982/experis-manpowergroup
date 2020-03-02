import axios from "axios";
//import router from "./../../../router";

const state = {
  interviews: []
};

const mutations = {
  INTERVIEW_SAVE(state, payload) {
    state.interviews = payload;
  }
};

const actions = {
  saveInterview({ commit }, data) {
    //console.log(data.interview);
    axios.post("/api/save-data-interview", data.interview).then(response => {
      console.log(response.data.interviews);

      commit("INTERVIEW_SAVE", response.data.interviews);
    });
  }
};

const getters = {
  interviews: state => state.interviews
};

const interviewModule = {
  state,
  mutations,
  actions,
  getters
};

export default interviewModule;
