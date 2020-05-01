import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from './components/LoginForm.vue';
import AdminHome from './components/AdminHome.vue';
import UserHome from './components/UserHome.vue';

Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/logon',
            name: 'logon',
            component: LoginForm
        },
        {
            path: '/user/:id',
            name: 'user',
            component: UserHome,
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