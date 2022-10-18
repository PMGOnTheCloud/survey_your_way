import { createRouter, createWebHistory } from 'vue-router';

import Login from '../src/components/Login.vue';
import Register from '../src/components/Register.vue';
import Dashboard from '../src/components/Dashboard.vue';
import Surveys from '../src/components/Surveys.vue';

import DefaultLayout from '../src/layouts/DefaultLayout.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
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
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
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


export default router;
