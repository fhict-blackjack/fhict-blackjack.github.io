import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 

var sendMessagePromise = function(message) {
  return new Promise(function(resolve, reject) {
    waitForConnectionPromise(1000).then(()=>{
      window.socket.send(message);
      resolve()
    });
  });
}


var waitForConnectionPromise = function(interval) {
  return new Promise(function(resolve, reject) {
    if (window.socket.readyState === 1) {
      resolve()
    } else {
      setTimeout(function () {
        waitForConnectionPromise().then(() => {
          resolve()
        });
      }, interval);
    }
  });
}

const Store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    authUser: {},
    currentGame: {
      joinCode: null,
      owner: {},
      settings: {},
      editedSettings: {},
      players: [],
      gameFinished: false,
      options: null,
      currentRound: {
        currentPhase: {
          totalTime: null,
          currentTime: null,
          interval: null,
          divider: null
        },
        cardTzar: null,
        blackCard: null,
        myCard: null,
        winnerCard: null,
        submittedCards: null
      },
      gameWinner: null
    }
  },
  mutations: {
    SET_GAME_SETTINGS(state, payload){
      state.currentGame.settings = payload;
      state.currentGame.editedSettings = JSON.parse(JSON.stringify(state.currentGame.settings));
    },
    ADD_GAME_PLAYER(state, payload){
      state.currentGame.players.push(payload);
      console.log(state.currentGame.players );
    },
    REMOVE_GAME_PLAYER(state, payload){
      const index = state.currentGame.players.findIndex(v => v.id === payload.id);
      if (index > -1) {
        state.currentGame.players.splice(index, 1);
      }
    },
    AUTH_PLAYER(state, player){
      state.isAuthenticated = true;
      state.authUser = player;
    },
    UPDATE_GAME_INFO(state, payload){
      state.currentGame.players = payload.players;

      state.currentGame.settings = payload.settings;
      state.currentGame.editedSettings = JSON.parse(JSON.stringify(state.currentGame.settings));

      state.currentGame.owner = payload.owner;
    },
    RESET_GAME_INFO(state){
      state.currentGame.players = [];
      state.currentGame.settings = {};
      state.currentGame.owner = {};
    },
    SET_CARDS(state, payload){
      console.log("3", payload);

      state.currentGame.options = payload;
    },
    UPDATE_ROUND_INFO(state, payload){

      state.currentGame.currentRound.blackCard = payload.blackCard;

      state.currentGame.currentRound.cardTzar = payload.cardTzar;
    },
    UPDATE_WINNER_INFO(state, payload){
      state.currentGame.currentRound.winnerCard = payload;
      console.log("round winner:", state.currentGame.currentRound.winnerCard);
    },
    UPDATE_SUBMITTED_CARDS(state, payload){
      state.currentGame.currentRound.submittedCards = payload;
    },
    UPDATE_TIMER(state, payload){
      clearInterval(state.currentGame.currentRound.currentPhase.interval);
      console.log("starttimer", payload);

      state.currentGame.currentRound.currentPhase.totalTime = payload;    
      state.currentGame.currentRound.currentPhase.currentTime = JSON.parse(JSON.stringify(state.currentGame.currentRound.currentPhase.totalTime));  
      state.currentGame.currentRound.currentPhase.divider = 100 / state.currentGame.currentRound.currentPhase.currentTime;
      console.log("timerinfo", state.currentGame.currentRound.currentPhase.totalTime, state.currentGame.currentRound.currentPhase.currentTime, state.currentGame.currentRound.currentPhase.divider);

      state.currentGame.currentRound.currentPhase.interval = setInterval(() => {
        state.currentGame.currentRound.currentPhase.currentTime -= 1;
        console.log("timer", state.currentGame.currentRound.currentPhase.currentTime);
        if (state.currentGame.currentRound.currentPhase.currentTime <= 0) {
          clearInterval(state.currentGame.currentRound.currentPhase.interval);
        }
      }, 1000)
    },
    GAME_WON_BY(state, payload){
      state.currentGame.gameWinner = payload;
      console.log("game winner:", state.currentGame.gameWinner);
    },
    GAME_DONE(state, payload){
      alert("doen");
    }
  },
  actions:{
    registerPlayer({}, username){
      var message = {
        operation: "REGISTER_PLAYER",
        content: JSON.stringify({
          username: username
        })
      };
      
      sendMessagePromise(JSON.stringify(message));
    },
    registeredPlayer({commit}, player){
      commit('AUTH_PLAYER', player);
    },
    createRoom({}){
      var message = {
        operation: "CREATE_ROOM"
      };
      sendMessagePromise(JSON.stringify(message));
    },
    joinRoom({}, params){
      var message = {
        operation: "JOIN_ROOM",
        content: params
      };
      sendMessagePromise(JSON.stringify(message));
    },
    leaveRoom({commit}, params){
      var message = {
        operation: "LEAVE_ROOM",
        content: params
      };
      sendMessagePromise(JSON.stringify(message));
      commit('RESET_GAME_INFO');
    },
    updateSettings({}, params){
      var message = {
        operation: "UPDATE_GAME_SETTINGS",
        content: JSON.stringify(params.settings),
        property:  params.id
      };

      sendMessagePromise(JSON.stringify(message));
    },
    startGame({}, params){
      var message = {
        operation: "START_GAME",
        property: params
      };
      sendMessagePromise(JSON.stringify(message));
    },
    updateGameInfo({commit}, payload){
      commit('UPDATE_GAME_INFO', payload);
    },
    updateSubmittedCards({commit}, payload){
      commit('UPDATE_SUBMITTED_CARDS', payload);
    },
    gameSettingsUpdated({commit}, payload){
      commit('SET_GAME_SETTINGS', payload);
    },
    gamePlayerJoined({commit}, payload){
      commit('ADD_GAME_PLAYER', payload);
    },
    gamePlayerLeft({commit}, payload){
      commit('REMOVE_GAME_PLAYER', payload);
    },
    phaseDealCards({commit}, payload){
      console.log("2", payload);

      commit('SET_CARDS', payload);
    },
    updateRoundInfo({commit}, payload){
      console.log("ronde info 2");
      commit('UPDATE_ROUND_INFO', payload);
    },
    updateTimer({commit}, timerData){
      commit('UPDATE_TIMER', timerData);
    },
    playWhiteCard({}, params){
      var message = {
        operation: "PLAY_WHITE_CARD",
        content: JSON.stringify(params.option),
        property: params.id
      };
      sendMessagePromise(JSON.stringify(message));
    },
    chooseWinningCard({}, params){
      var message = {
        operation: "CHOOSE_WINNING_CARD",
        content: JSON.stringify(params.option),
        property:  params.id
      };
      sendMessagePromise(JSON.stringify(message));
    },
    updateWinnerInfo({commit}, payload){
      commit('UPDATE_WINNER_INFO', payload);
    },
    gameWonBy({commit}, payload){
      commit('GAME_WON_BY', payload);
    },
    gameDone({commit}, payload){
      commit('GAME_DONE', payload);
    }
  }
})

export default Store;