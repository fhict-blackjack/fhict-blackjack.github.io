<template>
  <div>
    <h4 class="white--text">Page Not found</h4>
    <h4 class="white--text">Redirecting to Home page in:</h4>
    <custom-timer 
      :seconds="timerSeconds"
      @finished="onTimerFinish">
    </custom-timer>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        timerSeconds: 5
      }
    },
    methods: {
      onTimerFinish(){
        this.$router.push({ name: "home"});
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
