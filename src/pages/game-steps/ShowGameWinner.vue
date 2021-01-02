<template>
  <div>
    <h1 class="white--text">Player {{ $store.state.currentGame.gameWinner.username }} won the game!</h1>
    <v-row class="show-game-winner-page">
      <v-col cols="4">
      <v-btn
        elevation="2"
        rounded
        v-on:click="goToMainMenu"

      >GO TO MAIN MENU</v-btn>
      </v-col>
      <v-col cols="4">
      <v-btn
        elevation="2"
        rounded
        v-on:click="goToLobby"
      >GO TO LOBBY</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  methods: {
    goToMainMenu(){
      this.$store.dispatch('leaveRoom', this.$store.state.currentGame.joinCode).then(() =>{
          this.$router.push({ name: "home" });
      });
    },
    goToLobby(){
      var params = {code: this.$store.state.currentGame.joinCode};
      this.$router.push({ name: "lobby", params: params });
    }
  },
  mounted(){
    var self = this;
    window.socket.addEventListener("game-message", function(message) {
      switch(message.detail.operation){
        case "PLAYED_WHITE_CARD":
          self.$emit('confirm');
          break;
        default:
          break;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
  .show-game-winner-page{
    margin: 100px;
    .col {
      margin: auto
    }
  }
</style>
