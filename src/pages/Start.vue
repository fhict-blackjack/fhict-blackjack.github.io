<template>
  <div>
    <v-container fill-height fluid>
      <v-row align="center" justify="center" class="blm">
        <div class="center scaling">
          <v-img 
            contain
            :width="width"
            centered 
            src="assets/Logo.png"     
            class="hbj-logo" 
          >
          </v-img>
        </div>
      </v-row>
      <transition name="component-fade" mode="out-in">
        <custom-start-menu
          v-if="$store.state.isAuthenticated">
        </custom-start-menu>
        <custom-register-menu
          v-else
        ></custom-register-menu>
      </transition>
    </v-container>
  </div>
  
</template>

<script>
  export default {
    data(){
      return {
        width: 700
      }
    }
  }
</script>

<style lang="scss" scoped>
.hbj-logo{
  margin-bottom: 80px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
	0% {
		transform: translatey(0px);
	}
	40% {
		transform: translatey(-10px) rotate(10deg);
	}
  60% {
		transform: translatey(-20px)
	}
  80% {
		transform: translatey(-10px) rotate(-10deg);
	}
	100% {
		transform: translatey(0px);
	}
}

.scaling{
    float: left;
    -webkit-animation-name: scalex;
    -webkit-animation-duration:3s;
    -webkit-animation-iteration-count:infinite;
    -webkit-animation-timing-function:ease-in-out;
    -moz-animation-name: scale;
    -moz-animation-duration:3s;
    -moz-animation-iteration-count:infinite;
    -moz-animation-timing-function:ease-in-out;
}
    
@-webkit-keyframes scalex{
    from {-webkit-transform: scale(0.9);}
    65% {-webkit-transform: scale(1.0);}
    to {-webkit-transform: scale(0.9);}    
}
    
@-moz-keyframes scale{
    from {-moz-transform: scale(0.9);}
    65% {-moz-transform: scale(1.0);}
    to {-moz-transform: scale(0.9);}    
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
