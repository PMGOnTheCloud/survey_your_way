import { createRouter, createWebHistory } from 'vue-router';

import Login from '../src/components/Login.vue';
import Register from '../src/components/Register.vue';
import Dashboard from '../src/components/Dashboard.vue';
import Surveys from '../src/components/Surveys.vue';

import DefaultLayout from '../src/layouts/DefaultLayout.vue';

import store from "../store";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/surveys',
                name: 'Surveys',
                component: Surveys
            }
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        redirect: '/login',
        component: 'AuthLayout',
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
        ]
    },
    {
        path: '/:pathMatch(.*)',
        redirect: { name: 'Login' }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'Login'});
    } else if (store.state.user.token && (to.name === 'Login' || to.name === 'Register')) {
        next({name: 'Dashboard'});
    } else {
        next();
    }
});


export default router;
