<template>
  <div>
    <div v-if="!$store.state.currentGame.gameFinished">
      <devide-white-cards 
        v-if="step == 0">
      </devide-white-cards>
      <div v-if="step == 1">
        <show-black-card 
          v-if="isCardTzar()">
        </show-black-card>
        <wait-for-black-card 
          v-else>
        </wait-for-black-card>
      </div>
      <div v-if="step == 2">
        <wait-for-white-cards
          v-if="isCardTzar()">
        </wait-for-white-cards>
        <div v-else>
          <choose-white-cards 
            v-if="!confirmedAnswer" 
            @confirm="onConfirmAnswer">
          </choose-white-cards>
          <wait-for-other-players
            v-else>
          </wait-for-other-players>
        </div>
      </div>
      <div v-if="step == 3">
        <choose-winning-card
          v-if="isCardTzar()">
        </choose-winning-card>
        <wait-for-winning-card 
          v-else>
        </wait-for-winning-card>
      </div>
      <show-winner-card v-if="step == 4"></show-winner-card>
    </div>
    <div v-else>
      <show-game-winner></show-game-winner>
    </div>
    <v-bottom-navigation
      :input-value="active"
      color="indigo"
      fixed
      dark
>
      <v-menu open-on-hover
              top
              offset-y
              :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
                 dark
                 v-bind="attrs"
                 v-on="on">
            Chat
          </v-btn>
        </template>

        <Chat></Chat>
      </v-menu>
    </v-bottom-navigation>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        step: 0,
        active: true,
        confirmedAnswer: false
      }
    },
    methods: {
      isCardTzar(){
        return this.$store.state.currentGame.currentRound.cardTzar.id == this.$store.state.authUser.id;
      },
      onConfirmAnswer(){
        this.confirmedAnswer = true;
      },
      finishRound(){
        this.confirmedAnswer = false;
        this.step = 0;
      },
      finishGame(){
        this.$store.state.currentGame.gameFinished = true;
      },
    },
    mounted(){
      var self = this;
      window.socket.addEventListener("game-message", function(message) {
        switch(message.detail.operation){
          case "DEAL_PHASE":
            self.finishRound();
            break;
          case "READ_PHASE":
            self.step = 1;
            break;
          case "PLAY_PHASE":
            self.step = 2;
            break;
          case "DECIDE_PHASE":
            self.step = 3;
            break;
          case "WINNER_PHASE":
            self.step = 4;
            break;
          case "END_PHASE":
            self.finishGame();
            break;
          default:
            break;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>
