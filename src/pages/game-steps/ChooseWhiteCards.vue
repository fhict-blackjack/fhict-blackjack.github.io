<template>
  <div class="choose-white-card-page">
    <h4 class="white--text">Choose a card</h4>
    <v-row>
        <custom-card 
          isBlack="true" 
          :text="card.text">
        </custom-card>
    </v-row>
    <card-scroller
      :options="options"
      :selectable="selectable"
      @select="onSelect"
      @confirm="onConfirm">
    </card-scroller>
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
        options: this.$store.state.currentGame.options,
        selectable: true
      }
    },
    methods:{
      onSelect(option){
        this.$store.state.currentGame.currentRound.myCard = option;

        var params = { id:  this.$store.state.currentGame.joinCode, option: this.$store.state.currentGame.currentRound.myCard };

        this.$store.dispatch('playWhiteCard', params);
      },
      onConfirm(option){
        console.log(option);
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

</style>
