<template>
  <div>
    <v-row class="option-scroller">
      <v-col cols="1" v-if="scrollable">
          <v-btn 
            dark
            @click.native="scrollBoxLeft">&lt;
          </v-btn>
      </v-col>
      <v-col cols="10">
        <div class="scrolling-wrapper" id="mouse-scroll">
            <v-col class="card" v-bind:key="index" v-for="(option, index) in options" cols="12" sm="2">
              <transition name="fade" appear>
                <custom-card @click.native="selectOption(option)" :isSelected="selectedOption == option.id" :text="option.text" :style="animateShow ? { transitionDelay: 0.20 * index + 's' } : {}"></custom-card>
              </transition>
            </v-col>
        </div>
      </v-col>
      <v-col cols="1" v-if="scrollable">
          <v-btn 
          dark
          @click.native="scrollBoxRight">&gt;
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  const $ = require('jquery')

  export default {
    props: {
      options: {
        required: true
      },
      selectable: {
        required: true
      },
      animateShow: {
        required: false,
        default: false
      }
    },
    data() {
      return {
        selectedOption: null  
      }
    },
    mounted () {
      $('#mouse-scroll').on('mousewheel', function(event) {
        var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));
        $(this).scrollLeft( $(this).scrollLeft() - ( delta * 40 ) );
      });
    },
    methods:{
      randomId(){
        return Math.ceil(Math.random()*100);
      },
      scroll(delta){
        $('#mouse-scroll').stop();
        $('#mouse-scroll').animate({scrollLeft: $( $('#mouse-scroll')).scrollLeft() - ( delta * 40 )}, 800);
      },
      scrollBoxLeft(){
        this.scroll(50);
      },
      scrollBoxRight(){
        this.scroll(-50);
      },
      selectOption(option){
        if(!this.selectable)
          return;

        this.selectedOption = option.id;
        this.$emit('select', option)
      }
    },
    computed:{
      scrollable: function () {
        return this.options.length > 5
      }
    }
  }
</script>

<style lang="scss" scoped>
  .option-scroller{
    .col{
      margin: auto;
    }
  }
  .scrolling-wrapper {
    overflow-x: auto;
    white-space: nowrap;
    height: 350px;
    .card {
      display: inline-flex;
    }
  }

  .scrolling-wrapper {
    -webkit-overflow-scrolling: touch;
  }

  ::-webkit-scrollbar-track
  {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
  }

  ::-webkit-scrollbar
  {
      width: 10px;
      background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb
  {
      background-color: lightgray;
      border: 2px solid lightgray;
  }

  .scrolling-wrapper {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .custom-card {
    width: 100%;
    margin: auto;
  }

  .v-card.on-hover.theme--dark {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .v-card.on-hover.theme--dark > .v-card__text {
    color: #000;
  }

  .fade-enter-active, .fade-leave-active { transition: opacity .5s } .fade-enter, .fade-leave-to { opacity: 0 }

</style>
