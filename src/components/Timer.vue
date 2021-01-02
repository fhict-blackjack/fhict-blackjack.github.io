<template>
  <div class="custom-timer" v-if="$store.state.currentGame.currentRound.currentPhase.currentTime != null">
    <v-progress-circular
      :rotate="-90"
      :size="100"
      :width="15"
      :value="$store.state.currentGame.currentRound.currentPhase.divider * $store.state.currentGame.currentRound.currentPhase.currentTime"
      color="white"
    >
      {{ $store.state.currentGame.currentRound.currentPhase.currentTime }}
    </v-progress-circular>
   </div>
</template>

<style lang="scss" scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>
