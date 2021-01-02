<template>
  <div class="device-white-card-page">
    <h4 class="white--text">Those are your cards for this game</h4>
    <custom-timer 
      @finished="onTimerFinish">
    </custom-timer>

    <card-scroller
      :options="$store.state.currentGame.options"
      :selectable="selectable"
      :animate-show="animate">
    </card-scroller>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectable: false,
        animate: true
      }
    },
    methods: {
      onTimerFinish(){
        this.$emit('nextStep');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
