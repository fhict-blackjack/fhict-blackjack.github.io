import socket from './socket/index'
window.socket = socket

import Vue from 'vue'

import Store from './store/index'

import router from './router/index'
router.beforeEach((to, from, next) => {
  console.log("auth",to);

  if (to.meta.requiresAuth) {
    if (!Store.state.isAuthenticated) {
      next({
        path: "/start",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

import vuetify from './plugins/vuetify' // path to vuetify export

import JQuery from 'jquery'
window.$ = JQuery

import App from './App.vue'

import Drawer from './components/Main/Drawer.vue'
Vue.component("custom-drawer", Drawer);

import StartMenu from './components/Menu/Start.vue'
Vue.component("custom-start-menu", StartMenu);

import RegisterMenu from './components/Menu/Register.vue'
Vue.component("custom-register-menu", RegisterMenu);

import Card from './components/Card.vue'
Vue.component("custom-card", Card);

import CardScroller from './components/CardScroller.vue'
Vue.component("card-scroller", CardScroller);

import Timer from './components/Timer.vue'
Vue.component("custom-timer", Timer);

// PRE GAME STEPS
import DevideWhiteCards from './pages/game-steps/pre-game/DevideWhiteCards.vue'
Vue.component("devide-white-cards", DevideWhiteCards);

//STEPS
import WaitForBlackCard from './pages/game-steps/WaitForBlackCard.vue'
Vue.component("wait-for-black-card", WaitForBlackCard);

import ChooseWhiteCards from './pages/game-steps/ChooseWhiteCards.vue'
Vue.component("choose-white-cards", ChooseWhiteCards);

import WaitForOtherPlayers from './pages/game-steps/WaitForOtherPlayers.vue'
Vue.component("wait-for-other-players", WaitForOtherPlayers);

import WaitForWinningCard from './pages/game-steps/WaitForWinningCard.vue'
Vue.component("wait-for-winning-card", WaitForWinningCard);

import ShowWinnerCard from './pages/game-steps/ShowWinnerCard.vue'
Vue.component("show-winner-card", ShowWinnerCard);

import ShowGameWinner from './pages/game-steps/ShowGameWinner.vue'
Vue.component("show-game-winner", ShowGameWinner);

//CARD TZAR 
import ShowBlackCard from './pages/game-steps/card-tzar/ShowBlackCard.vue'
Vue.component("show-black-card", ShowBlackCard);

import ChooseWinningCard from './pages/game-steps/card-tzar/ChooseWinningCard.vue'
Vue.component("choose-winning-card", ChooseWinningCard);

import WaitForWhiteCards from './pages/game-steps/card-tzar/WaitForWhiteCards.vue'
Vue.component("wait-for-white-cards", WaitForWhiteCards);

new Vue({
  vuetify,
  router: router,
  store: Store,
  el: '#app',
  render: h => h(App)
})
