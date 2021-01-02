<template>
  <v-app id="app">
    <transition name="component">

      <div class="profile-bar" v-if="$store.state.isAuthenticated">
        <div dark class="profile-box">
          <h1
          class="white--text">
            {{ $store.state.authUser.username }}#{{ $store.state.authUser.id }}
          </h1>
        </div>
      </div>
    </transition>
    <v-snackbar
      flat
      v-model="error.show"
      top
    >
      <h1 class="justify-center">{{ error.message }}</h1>
    </v-snackbar>
    <transition name="slide">

    <!-- Sizes your content based upon application components -->
    <v-main overflow-y-none class="grey darken-2" >

      <!-- Provides the application the proper gutter -->
      <v-container fluid fill-height >
        <v-layout
          justify-center
          align-center 
        >
          <v-flex text-xs-center >
            <!-- If using vue-router -->
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    </transition>

  </v-app>
</template>

<script>
 export default {
  name: 'app',
  data () {
    return {
      msg: 'FHICT Blackjack by Hrajr Hakobjan',
      isHome: false,
      error: {
        show: false,
        message: ""
      }
    }
  },
  methods: {
    showError(errorMessage){
      this.error.message = errorMessage;
      this.error.show = true;
    }
  },
  mounted(){
    var self  = this;

    window.socket.addEventListener("game-message", function(message) {
      switch(message.detail.operation){
        case "ERROR":
          self.showError(message.detail.content);
          break;
        case "GAME_INFO":
          self.$store.dispatch('updateGameInfo', JSON.parse(message.detail.content));
          break; 
        case "TIMER_INFO":
          self.$store.dispatch('updateTimer', JSON.parse(message.detail.content));
          break;
        case "ROUND_INFO":
          self.$store.dispatch('updateRoundInfo', JSON.parse(message.detail.content));
          break;
        case "WINNER_INFO":
          self.$store.dispatch('updateWinnerInfo', JSON.parse(message.detail.content));
          break;
        case "DEAL_CARDS":
          self.$store.dispatch('phaseDealCards', JSON.parse(message.detail.content));
          break;
        case "SUBMITTED_CARDS":
          self.$store.dispatch('updateSubmittedCards', JSON.parse(message.detail.content));
          break;
        case "GAME_WON_BY":
          self.$store.dispatch('gameWonBy', JSON.parse(message.detail.content));
          break;
        case "GAME_DONE":
          self.$store.dispatch('gameDone', JSON.parse(message.detail.content));
          break;
      }
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

html { 
  overflow-y: hidden 
}

.v-main{
  padding: 0px!important;
}

.profile-bar{
  width: 100%;
  position: fixed;

  .profile-box{
    position: absolute;
    height: 50px;
    min-width: 100px;
    top: 0;
    right: 0;
    background: #2e2e2e;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    border-radius: 0% 0% 0% 10%;
    padding: 0px 30px;
  }
}
</style>
