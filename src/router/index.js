import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Browse from '../pages/Browse'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/browse',
            name: 'Browse',
            component: Browse
        }
    ]
});