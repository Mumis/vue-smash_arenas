import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import Browse from '../components/Browse'

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