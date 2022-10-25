import { createStore } from "vuex";
import axiosClient from '../src/axios';

const tmpSurveys = [
    {
        id: 100,
        title: "The BRO CONTENT",
        slug: "the bro content",
        status: "draft",
        image: "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr",
        description: "My name is Pablo  and i'm a <b>software developer</b>",
        created_at: "2022-10-20 20:00:00",
        updated_at: "2022-10-20 20:00:00",
        expire_date: "2022-10-30 20:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        { uuid: "0291331e-e3ec-48ae-ac47-32c769db985c" , text: "USA"},
                        { uuid: "8542cf0e-ba22-4bed-b39c-6650f0dbfe5b" , text: "Georgia"},
                        { uuid: "767e734c-fac4-41eb-9195-dacc47691ebe" , text: "Germany"},
                        { uuid: "26b92de5-5a79-474d-8f38-919710d0d9db" , text: "India"},
                        { uuid: "2ec9a266-17d6-4bf0-9bcd-e58403eac33e" , text: "Spain"},
                        { uuid: "a32a974c-1cc1-4f83-aefc-06aefb0443f6" , text: "Mongolia"},
                        { uuid: "93a3f4fe-12ea-4dfd-ad41-1b8f9ef4f5a5" , text: "United Kingdom"},
                        { uuid: "8a9808d7-f9ee-4a59-a507-b9b7a7b08861" , text: "Moldova"},
                    ]
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "Which languages do you have the most skill in?",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                data: {
                    options: [
                        { uuid: "33960df0-667d-42be-b578-646cedb051b6" , text: "JavaScript"},
                        { uuid: "50bd1725-8e6e-4c8b-bceb-d372f3b6823e" , text: "PHP"},
                        { uuid: "0bdc568b-66f8-4efd-b8d3-53aaec16e946" , text: "HTML"},
                        { uuid: "6a1fb26d-1cc6-48fd-9feb-b6d5d2d8927b" , text: "CSS"},
                        { uuid: "5eef6640-a652-444d-8b85-35545accf92d" , text: "Python"},
                        { uuid: "cd369e4b-56d1-4980-aa69-6d898a3c2a1d" , text: "Node.js"},
                        { uuid: "c82b52ff-e623-4bd1-bd5b-33a865d242f1" , text: "Java"},
                        { uuid: "4c4a52e7-2362-4557-861c-ee8e7cf09d5a" , text: "Perl"},
                    ]
                }
            },
            {
                id: 3,
                type: "checkbox",
                question: "Which concepts of PHP do you want to know?",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                data: {
                    options: [
                        { uuid: "1723bdc4-8f2c-4182-a3c4-f3a7095bd180" , text: "Laravel"},
                        { uuid: "bfb1eb75-128b-4971-9ca0-8e32449cd78d" , text: "Yii2"},
                        { uuid: "6f8df8e6-0623-4e42-bd53-6ffd8ead8592" , text: "Codeigniter"},
                        { uuid: "9c3ff154-5506-4fce-869f-cb4b227311dc" , text: "Symfony"},
                    ]
                }
            },
            {
                id: 4,
                type: "radio",
                question: "Which Laravel version do you like the most?",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                data: {
                    options: [
                        { uuid: "9c3ff154-5506-4fce-869f-cb4b227311dc" , text: "Laravel v6"},
                        { uuid: "50f5c78a-ce12-4768-97ad-096ad86d97d5" , text: "Laravel v7"},
                        { uuid: "46839080-258b-4b50-aa20-8bac6c1f0806" , text: "Laravel v8"},
                        { uuid: "c50c1e43-a3b1-48f6-a116-f7af98b9e23d" , text: "Laravel v9"},
                    ]
                }
            },
            {
                id: 5,
                type: "checkbox",
                question: "Which type of projects do you want to do in the future?",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                data: {
                    options: [
                        { uuid: "ed93cec3-9637-4854-8d77-eaf56f64e759" , text: "Rest API"},
                        { uuid: "548378dc-65fb-4276-b919-f148c85f542b" , text: "e-Commerce"},
                        { uuid: "a4f34d9a-ea65-4e4d-b38f-3d2a34b72df3" , text: "Unity game development"},
                        { uuid: "58535b51-14a7-4b65-958f-61da854fc832" , text: "Geolocation app"},
                    ]
                }
            },
            {
                id: 6,
                type: "text",
                question: "What is your favourite videogame?",
                description: null,
                data: {},
            },
            {
                id: 7,
                type: "textarea",
                question: "What is your favourite book and why?",
                description: "It can be from any genre even if its a film that was later adapted into a book",
                data: {},
            },
        ],
    },
    {
        id: 200,
        title: "Laravel 8",
        slug: "laravel-8",
        status: "active",
        image: "https://proximahost.es/blog/wp-content/uploads/2022/05/Laravel.jpg",
        description: "Laravel is a PHP based web framework. <i>In which I have a love and hate relationship with...</i>",
        created_at: "2022-10-20 20:00:00",
        updated_at: "2022-10-20 20:00:00",
        expire_date: "2022-10-30 20:00:00",
        questions: []
    }
];

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
        surveys: [...tmpSurveys],
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
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
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
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
    },
    modules: {}
});

export default store;
