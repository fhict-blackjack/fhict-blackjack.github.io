<template>
  <div>
    <h1 class="white--text">The card Tzar chose the following card from {{ $store.state.currentGame.currentRound.winnerCard.player.username }}</h1>
    <v-row class="show-winner-card-page">
      <v-col cols="4">
        <custom-card 
          isBlack="true" 
          :text="$store.state.currentGame.currentRound.blackCard.text">
        </custom-card>
      </v-col>
      <v-col cols="4">
        <custom-card 
          :text="$store.state.currentGame.currentRound.winnerCard.cards[0].text">
        </custom-card>
      </v-col>
      <v-col cols="4">
        <custom-timer></custom-timer>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
  .show-winner-card-page{
    margin: 100px;
    .col {
      margin: auto
    }
  }
</style>
