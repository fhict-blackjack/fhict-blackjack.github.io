<template>
  <div class="choose-white-card-page">
    <h4 class="white--text">Choose the winning card</h4>
    <v-row>
        <custom-card 
          isBlack="true" 
          :text="card.text">
        </custom-card>
    </v-row>
    <card-scroller
      :options="$store.state.currentGame.currentRound.submittedCards"
      :selectable="selectable"
      @select="onSelect">
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
        selectable: true   
      }
    },
    methods:{
      onSelect(option){
        this.$store.state.currentGame.currentRound.winnerCard = option;

        var params = { id:  this.$store.state.currentGame.joinCode, option: this.$store.state.currentGame.currentRound.winnerCard };

        this.$store.dispatch('chooseWinningCard', params);
      }
    },
    mounted(){
      var self = this;
      window.socket.addEventListener("game-message", function(message) {
        switch(message.detail.operation){
          case "WINNING_CARD_CHOSEN":
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
