import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formdata: [
      { label: "ваше имя", text: "" },
      { label: "возраст", text: "" },
      { label: "должность", text: "" },
      { label: "О себе", text: "" },
      { label: "дата рождения", text: "" },
      { label: "город", text: "" },
      { label: "улица и дом", text: "" },
      { label: "готовность к переезду", text: "" },
      { label: "телефон", text: "" },
      { label: "почта", text: "" },
      { label: "email", text: "" },
      { label: "сайт", text: "" },
      { label: "соц. сеть", text: "" },
      { label: "др. способы связи", text: "" },
    ],
    files: [{ label: "ваше фото", value: "", isSet: false }],
    selects: [
      { label: "занятости", value: [] },
      { label: "график", value: [] },
    ],
    briefcases: [] as object[],
    // as {
    //   id: number;
    //   body: string;
    //   username: string;
    // }[],
  },
  getters: {
    formdata: (state) => state.formdata,
    files: (state) => state.files,
    selects: (state) => state.selects,
    briefcases: (state) => state.briefcases,
  },
  mutations: {
    updateForm: function (state, { value, name }) {
      const index = state.formdata.findIndex((d) => d.label === name);
      state.formdata[index].text = value;
    },
    updateFiles: function (state, { value, name }) {
      const index = state.files.findIndex((d) => d.label === name);
      state.files[index].value = value;
      state.files[index].isSet = true;
    },
    updateSelects: function (state, { str, name }) {
      const index = state.selects.findIndex((d) => d.label === name);
      state.selects[index].value = str;
    },
    addBriefcases: function (state, briefcase) {
      state.briefcases.push(briefcase);
    },
  },
  actions: {
    updateForm({ commit }, { value, name }) {
      commit("updateForm", { value, name });
    },
    addBriefcases({ commit }, briefcase) {
      commit("addBriefcases", briefcase);
      console.log(briefcase);
    },
    updateSelects({ commit }, { str, name }) {
      commit("updateSelects", { str, name });
    },
    updateFile({ commit }, { value, name }) {
      commit("updateFiles", { value, name });
    },
  },
  modules: {},
});
