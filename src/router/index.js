import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/home.vue';
import Login from '../views/login.vue';
import Music from '../views/music.vue';
import Hotline from '../views/hotline.vue';
import Active from '../views/active.vue';
import Article from '../views/article.vue';
import Tip from '../views/tip.vue';
import Test from '../views/test.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/music',
        name: 'music',
        component: Music,
      },
      {
        path: '/hotline',
        name: 'hotline',
        component: Hotline,
      },
      {
        path: '/article',
        name: 'article',
        component: Article,
      },
      {
        path: '/active',
        name: 'active',
        component: Active,
      },
      {
        path: '/tip',
        name: 'tip',
        component: Tip,
      },
      {
        path: '/test',
        name: 'test',
        component: Test,
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
