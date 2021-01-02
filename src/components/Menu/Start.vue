<template>
  <div>
    <v-bottom-navigation
      grow
      height="auto"
      fixed
      dark
    >
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
          elevation="2" 
          @click="createGame"
          v-bind="attrs"
          v-on="on">
            Create Game
          </v-btn>
          </template>
        <span>Click to create host new game</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-row>
            <v-col>
              <v-text-field
                v-if="joinMode == 'code'" 
                class="custom-joincode-input"
                v-model="joinCode"
                v-bind="attrs"
                v-on="on"
                placeholder="Join Code"
                solo
              ></v-text-field>
              <v-text-field 
                v-else
                class="custom-joincode-input"
                v-model="joinLink"
                v-bind="attrs"
                v-on="on"
                placeholder="Join Link"
                solo
              ></v-text-field>
              </v-col>

              <v-col>
                <v-radio-group
                  v-model="joinMode"
                  row
                >
                  <v-radio
                    label="Join Code"
                    value="code"
                  ></v-radio>
                  <v-radio
                    label="Join Link"
                    value="link"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </template>
      <span>Fill the <span v-if="joinMode == 'code'">4 digit</span> join {{ joinMode }} and click the 'Join Game' button</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
          elevation="2" 
          @click="joinGame"
          v-bind="attrs"
          v-on="on">
            Join Game
          </v-btn>
          </template>
        <span>Click to join an existing game</span>
      </v-tooltip>
    </v-bottom-navigation>
  </div>
  
</template>

<script>
  export default {
    data(){
      return {
        joinCode: null,
        width: 700,
        joinMode: "code",
      }
    },
    methods: {
      createGame() {        
        this.$store.dispatch('createRoom');
      },      
      joinGame() {
        var params = this.joinCode;

        this.$store.dispatch('joinRoom', params);
      },
    },
    mounted(){
      var self = this;
      window.socket.addEventListener("game-message", function(message) {
        switch(message.detail.operation){
          case "CREATED_ROOM":
          case "JOINED_ROOM":
            var params = {code: message.detail.content};
            self.$router.push({ name: "lobby", params: params });
            break;
          default:
            break;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
.custom-joincode-input{
  margin: 10px 0px;
}

</style>
