import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import AdminHome from './components/AdminHome.vue';
import UserHome from './components/User/UserHome.vue';
import Achievments from './components/User/Menu/Achievments.vue';
import Home from './components/Home.vue';

Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/logon',
            name: 'logon',
            component: LoginForm
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterForm
        },
        {
            path: '/user/:id',
            name: 'user',
            component: UserHome,
            props: true
        },
        {
            path: '/user/:id/achievments',
            name: 'achievments',
            component: Achievments,
            props: true
        },
        {
            path: '/admin/:id',
            name: 'admin',
            component: AdminHome,
            props: true
        }
    ]
})