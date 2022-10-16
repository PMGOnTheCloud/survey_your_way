import { createRouter, createWebHistory } from 'vue-router';

import Login from '../src/components/Login.vue';
import Register from '../src/components/Register.vue';

const routes=[
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
