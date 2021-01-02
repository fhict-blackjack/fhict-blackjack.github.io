<template>
  <div fluid fill-height>
    <v-snackbar
    flat
      v-model="toast"
      top
    >
      <h1 class="justify-center">Copied Room Code</h1>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      width="500"
      :persistent="editedSettings() ? true : false"
    >
      <v-col>
        <v-card dark class="mx-auto" max-width="500" min-width="300" tile>
          <v-list
            :ripple="{ class: 'grey--text' }"
            flat>
            <v-card-title class="justify-center">Rules</v-card-title>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Min Player Count</v-list-item-title>
                    <v-col
                      cols="2">
                      <v-btn
                        v-if="isOwner() && ($store.state.currentGame.editedSettings.minPlayerCount > 3)"
                        elevation="2"
                        icon
                        rounded
                        @click.native="removeFromMinPlayerCount">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                        </svg>
                      </v-btn>
                    </v-col>
                    <v-col cols="8">{{ $store.state.currentGame.editedSettings.minPlayerCount }}</v-col>
                    <v-col
                      cols="2">
                      <v-btn
                        v-if="isOwner() && ($store.state.currentGame.editedSettings.minPlayerCount < $store.state.currentGame.editedSettings.maxPlayerCount)"
                        elevation="2"
                        icon
                        rounded
                        @click.native="addToMinPlayerCount">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                      </v-btn>
                    </v-col>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Max Player Count</v-list-item-title>
                    <v-col
                      cols="2">
                      <v-btn
                        v-if="isOwner() && ($store.state.currentGame.editedSettings.maxPlayerCount > $store.state.currentGame.editedSettings.minPlayerCount)"
                        elevation="2"
                        icon
                        rounded
                        @click.native="removeFromMaxPlayerCount">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                        </svg>
                      </v-btn>
                    </v-col>
                    <v-col cols="8">{{ $store.state.currentGame.editedSettings.maxPlayerCount }}</v-col>
                    <v-col
                      cols="2">
                      <v-btn
                        v-if="isOwner() && ($store.state.currentGame.editedSettings.maxPlayerCount < 10)"
                        elevation="2"
                        icon
                        rounded
                        @click.native="addToMaxPlayerCount">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                      </v-btn>
                    </v-col>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <transition name="component-fade" mode="out-in" appear>
              <div>
                <v-btn v-if="editedSettings()" @click.stop="saveSettings">Save</v-btn>
                <v-btn v-if="editedSettings()" @click.stop="discardSettings()">Discard</v-btn>
              </div>
            </transition>
          </v-list>
        </v-card>
      </v-col>
    </v-dialog>
    <v-row>
      <v-col
        cols="12"
        sm="8">
        <h2 class="white--text join-label">Lobby for room with Join code</h2>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <h1 small elevation="2" @click="copyCode" v-bind="attrs" v-on="on" ref="textToCopy" class="white--text join-code"><span type="text" :value="$store.state.currentGame.joinCode" id="join-code">{{$store.state.currentGame.joinCode}}</span></h1>
          </template>
          <span>Click to copy</span>
        </v-tooltip>
      </v-col>
      <v-col
        cols="12"
        sm="2">
        <v-card dark class="mx-auto" max-width="500" min-width="300" tile>
          <v-list disabled>
            <v-card-title class="justify-center">Players {{ $store.state.currentGame.players.length }}/{{ $store.state.currentGame.editedSettings.maxPlayerCount }}</v-card-title>
            <v-list-item-group v-model="$store.state.currentGame.players" color="primary" v-if="$store.state.currentGame.players.length > 0">
              <v-list-item v-for="(player, p) in $store.state.currentGame.players" :key="p">
                <v-list-item-content>
                  <v-list-item-title v-text="player.username"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group v-else>
              Nog geen leden
             </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col
      cols="0"
      sm="2">

      </v-col>
    </v-row>
    <v-bottom-navigation grow height="50px" fixed dark>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small elevation="2" @click="toggleSettings" v-bind="attrs" v-on="on">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
            </svg>
          </v-btn>
        </template>
        <span>Click to edit round settings</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-tooltip top  v-if="isOwner()">
        <template v-slot:activator="{ on, attrs }">
          <v-btn elevation="2" @click="startGame" v-bind="attrs" v-on="on">
            Start Game
          </v-btn>
        </template>
        <span>Click to start the game</span>
      </v-tooltip>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      settings: {
        maxPlayerCount: 5,
        cardOptionCount: 6,
        toggleChildMode: "disabled"
      },
      toast: false
    };
  },
  methods: {
    isOwner(){
      return this.$store.state.currentGame.owner.id == this.$store.state.authUser.id;
    },
    editedSettings(){
      return (JSON.stringify(this.$store.state.currentGame.settings) != JSON.stringify(this.$store.state.currentGame.editedSettings));
    },
    saveSettings(){
      this.$store.state.currentGame.settings = JSON.parse(JSON.stringify(this.$store.state.currentGame.editedSettings));
      this.dialog = true;

      var params = { id: this.$store.state.currentGame.joinCode, settings: this.$store.state.currentGame.settings };

      this.$store.dispatch('updateSettings', params).then(()=>{
        console.log("updated settings");
      });
    },
    discardSettings(){
      this.$store.state.currentGame.editedSettings = JSON.parse(JSON.stringify(this.$store.state.currentGame.settings));
    },
    removeFromMinPlayerCount(){
      this.$store.state.currentGame.editedSettings.minPlayerCount--;
    },
    addToMinPlayerCount(){
      this.$store.state.currentGame.editedSettings.minPlayerCount++;
    },    
    removeFromMaxPlayerCount(){
      this.$store.state.currentGame.editedSettings.maxPlayerCount--;
    },
    addToMaxPlayerCount(){
      this.$store.state.currentGame.editedSettings.maxPlayerCount++;
    },
    removeFromCardOptionCount(){
      this.$store.state.currentGame.editedSettings.cardOptionCount--;
    },
    addToCardOptionCount(){
      this.$store.state.currentGame.editedSettings.cardOptionCount++;
    },
    removeFromScoreToWin(){
      this.$store.state.currentGame.editedSettings.scoreToWin--;
    },
    addToScoreToWin(){
      this.$store.state.currentGame.editedSettings.scoreToWin++;
    },
    startGame() {
      this.$store.dispatch("startGame", this.$store.state.currentGame.joinCode);
    },
    toggleSettings(){
      this.dialog = true;
    },
    copyCode () {
      const el = document.createElement('textarea'); // Create a <textarea> element
      el.value = this.$store.state.currentGame.joinCode;  // Set its value to the string that you want copied
      el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
      el.style.position = 'absolute';
      el.style.left = '-9999px'; // Move outside the screen to make it invisible
      document.body.appendChild(el); // Append the <textarea> element to the HTML document
      el.select(); // Select the <textarea> content
      document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el); // Remove the <textarea> element
      this.toast = true;
    },
    leaveGame() {
      var params = this.$store.state.currentGame.joinCode;
      this.$store.dispatch('leaveRoom', params);
    }
  },
  mounted(){
    var self  = this;
    this.$store.state.currentGame.joinCode = this.$route.params.code;

    window.socket.addEventListener("game-message", function(message) {
      switch(message.detail.operation){
        case "GAME_SETTINGS_UPDATED":
          self.$store.dispatch('gameSettingsUpdated', JSON.parse(message.detail.content));
          break;
        case "GAME_PLAYER_JOINED":
          self.$store.dispatch('gamePlayerJoined', JSON.parse(message.detail.content));
          break;
        case "GAME_PLAYER_LEFT":
          self.$store.dispatch('gamePlayerLeft', JSON.parse(message.detail.content));
          break;
        case "GAME_STARTED":
          var params = {code: self.$store.state.currentGame.joinCode};

          self.$router.push({ name: "game", params: params });
          break;
        default:
          break;
      }
    });

    // var val = this.$router.beforeEach((to, from, next) => {
    //   console.log(from);
    //   if(from.name == "game" || from.name == "lobby"){
    //     self.leaveGame();
    //   }
    //   val();
    //   next();
    // });
  }
};
</script>

<style lang="scss" scoped>
.join-code {
  margin: 2%;
  height: 50%;
}

.join-label{
  height: 50%;
}


.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
