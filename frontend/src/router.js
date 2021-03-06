import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import AdminHome from './components/AdminHome.vue';
import UserHome from './components/User/UserHome.vue';
import Achievments from './components/User/Menu/Achievments.vue';
import Materials from './components/User/Menu/Materials.vue';
import JustTranslate from './components/User/Games/JustTranslate.vue';
import Exercises from './components/User/Games/Exercises.vue';
import Progress from './components/User/Menu/Progress.vue';
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
            path: '/user/:id/progress',
            name: 'progress',
            component: Progress,
            props: true
        },
        {
            path: '/user/:id/materials',
            name: 'materials',
            component: Materials,
            props: true
        },
        {
            path: '/user/:id/translate',
            name: 'translate',
            component: JustTranslate,
            props: true
        },
        {
            path: '/user/:id/exercise',
            name: 'exercise',
            component: Exercises,
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