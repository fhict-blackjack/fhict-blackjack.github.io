<template>
  <div class="show-black-card-page">
    <h1 class="white--text">You are not the card Tzar this round</h1>
    <h4 class="white--text">Wait for the card Tzar to start the round</h4>
    <custom-timer>
    </custom-timer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        card: {
          text: this.$store.state.currentGame.currentRound.blackCard.text,
          isBlack: true
        },
      }
    }
  }
</script>
