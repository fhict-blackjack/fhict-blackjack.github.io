<template>
  <div class="show-black-card-page">
    <h1 class="white--text">You are the card Tzar</h1>
    <h4 class="white--text">Read the card as loud as possible</h4>
    <v-row class="show-black-card">
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
    data() {
      return {
        card: {
          text: this.$store.state.currentGame.currentRound.blackCard.text,
          isBlack: true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.show-black-card{
  margin: 100px;
  .col {
    margin: auto
  }
}
</style>
