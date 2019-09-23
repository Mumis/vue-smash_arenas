import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import CreateLobby from '../pages/CreateLobby'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/login',
        },
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/createlobby',
            name: 'createlobby',
            component: CreateLobby,
            meta: {
                requiresAuth: true,
            },
        },
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;