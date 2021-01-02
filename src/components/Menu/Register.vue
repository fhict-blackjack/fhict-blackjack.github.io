<template>
  <div>
    <v-bottom-navigation
      grow
      height="auto"
      fixed
      dark
    >
      <v-spacer></v-spacer>
        <v-text-field
          class="custom-username-input"
          v-model="userName"
          @keyup.enter.native="register"
          placeholder="Please enter your username"
          solo
        ></v-text-field>
      <v-spacer></v-spacer>
    </v-bottom-navigation>
  </div>
  
</template>

<script>
  export default {
    data(){
      return {
        userName: null
      }
    },
    methods: {
      register() {        
        this.$store.dispatch('registerPlayer', this.userName);
      }
    },
    mounted(){
      var self = this;
      window.socket.addEventListener("game-message", function(message) {
        switch(message.detail.operation){
            case "REGISTERED_PLAYER":
              self.$store.dispatch('registeredPlayer',  JSON.parse(message.detail.content)).then(() =>{
                console.log("test: ", self.$store.state.isAuthenticated);
              });
              break;
            default:
              break;
          }
      });
    }
  }
</script>

<style lang="scss" scoped>
.custom-username-input{
  margin: 10px 0px;
}

</style>
