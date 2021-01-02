<template>
  <div class="show-black-card-page">
    <h1 class="white--text">Wait for the card Tzar to pick the winning card</h1>
    <v-row class="wait-for-others">
      <v-col cols="6">
        <custom-card 
          isBlack="true" 
          :text="card.text">
        </custom-card>
      </v-col>
      <v-col cols="6">
        <custom-timer></custom-timer>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        timerSeconds: 30,
        card: {
          text: this.$store.state.currentGame.currentRound.blackCard.text,
          isBlack: true
        }
      }
    },
    mounted(){
      this.$store.state.currentGame.currentRound.winnerCard = this.$store.state.currentGame.currentRound.myCard;
    }
  }
</script>
<style lang="scss" scoped>
.wait-for-others{
  margin: 100px;
  .col {
    margin: auto
  }
}
</style>
