import { createStore } from "vuex";
import axiosClient from '../src/axios';

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        currentSurvey: {
            loading: false,
            data: {}
        },
        surveys: {
            loading: false,
            links: [],
            data: {}
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        notification: {
            show: false,
            type: null,
            message: null
        },
    },
    getters: {},
    actions: {
        getSurvey({ commit }, id) {
            commit("setCurrentSurveyLoading", true);
            return axiosClient
                .get(`/survey/${id}`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                });
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url
            let response;
            if (survey.id) {
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit("setCurrentSurvey", res.data);
                        return res;
                    });
            } else {
                response = axiosClient.post('/survey', survey).then((res) => {
                    commit("setCurrentSurvey", res.data);
                    return res;
                });
            }
            return response;
        },
        deleteSurvey({}, id) {
            return axiosClient.delete(`survey/${id}`);
        },
        getSurveys({ commit }, {url = null} = {}) {
            url = url || '/survey';
            commit('setSurveysLoading', true);
            return axiosClient.get(url).then((res) => {
                commit('setSurveysLoading', false);
                commit('setSurveys', res.data);
                return res;
            });
        },
        getSurveyBySlug({ commit }, slug) {
            commit("setCurrentSurveyLoading", true);
            return axiosClient
                .get(`/survey-by-slug/${slug}`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                });
        },
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                });
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                });
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout');
                    return response
                });
        }
    },
    mutations: {
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        setSurveys: (state, surveys) => {
            state.surveys.links = surveys.meta.links;
            state.surveys.data = surveys.data;
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        notify: (state, {message, type}) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 3000);
        }
    },
    modules: {}
});

export default store;
