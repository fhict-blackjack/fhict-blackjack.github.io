import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import NotFound from '../pages/404.vue';

import Start from '../pages/Start.vue'
import Game from '../pages/Game.vue'
import Lobby from '../pages/Lobby.vue'

const routes = [
  { path: '/', name:"default", component: Start, meta: {requiresAuth: false} },
  { path: '/start', name:"home", component: Start, meta: {requiresAuth: false}  },
  { path: '/game/:code', name:"game", component: Game, meta: {requiresAuth: true}  },
  { path: '/lobby/:code', name:"lobby", component: Lobby, meta: {requiresAuth: true}  },
  { path: '/404', component: NotFound },
  { path: '*', redirect: '/404' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
